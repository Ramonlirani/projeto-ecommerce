import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { get, isEmpty } from 'lodash';
import { randomUUID } from 'crypto';
import { User } from '@core/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@core/dtos/user.dto';
import { PrismaService } from '@prisma/prisma.service';
import { UserFactoryService } from './user-factory.service';
import { excludeFieldFromUser } from '@helpers/excludeFieldFromUser';
import { IMailService } from '@core/abstracts/mail-services.abstract';
import { getEmailTemplatePath } from '@helpers/getEmailTemplatePath';
import { validateCPFCNPJ } from '@helpers/validateCpfCnpj';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { PageMetaDto } from '@core/dtos/page-meta.dto';
import { PageDto } from '@core/dtos/page.dto';
import { FileUseCases } from '@use-cases/file/file.use-case';
import { genericError, notFoundError } from '@helpers/errors';
import { env } from '@env';

@Injectable()
export class UserUseCases {
  constructor(
    private prismaService: PrismaService,
    private userFactoryService: UserFactoryService,
    private mailService: IMailService,
    private fileUseCase: FileUseCases,
  ) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getById(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id, deletedAt: null },
      });
      if (!user) throw notFoundError;

      return excludeFieldFromUser(user, 'password');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw notFoundError;
      }

      throw genericError;
    }
  }

  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return excludeFieldFromUser(user, 'password');
  }

  async getUserByDocument(document: string) {
    return this.prismaService.user.findFirst({
      where: {
        document,
        deletedAt: null,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const document = get(createUserDto, 'document');

    if (document && !validateCPFCNPJ(document)) {
      throw new BadRequestException('CPF ou CNPJ está incorreto.');
    }

    await this.validateUniqueInformation(null, createUserDto);

    return await this.prismaService.$transaction(async (prisma) => {
      const user = await this.userFactoryService.createNewUser(createUserDto);
      const roleId = get(createUserDto, 'roleId');

      let role = null;
      if (roleId) {
        role = await prisma.role.findUnique({ where: { id: roleId } });
      } else {
        role = await prisma.role.findUnique({
          where: { code: 'client' },
        });
      }

      const isClient = role.code === 'client';

      if (!isClient) {
        user.verifiedAt = new Date();
      }

      const newUser = await prisma.user.create({
        data: { ...user, roleId: role.id, roleCode: role.code },
      });

      if (!isClient) return newUser;

      await this.sendWelcomeEmail(newUser);

      return newUser;
    });
  }

  async sendWelcomeEmail(newUser: User) {
    const subject = 'Confirmação de e-mail';
    const code = randomUUID();
    const linkVerification = `${process.env.FRONTEND_URL}/auth/validar-email/${code}`;

    const templatePath = getEmailTemplatePath('confirm-email.hbs');

    const emailSent = await this.mailService.sendEmail({
      to: newUser.email,
      subject,
      variables: {
        name: newUser.name,
        email: newUser.email,
        linkVerification,
      },
      path: templatePath,
    });

    if (emailSent) {
      await this.prismaService.emailVerification.create({
        data: {
          email: newUser.email,
          code,
        },
      });
    }
  }

  async validateUniqueInformation(
    currentUser: Omit<User, 'password'>,
    userDto: CreateUserDto | UpdateUserDto,
  ) {
    let userExists = null;
    const currentDocument = get(currentUser, 'document', '');
    const currentEmail = get(currentUser, 'email', '');

    if (userDto.document && currentDocument !== userDto.document) {
      userExists = await this.getUserByDocument(userDto.document);

      if (userExists) {
        throw new ForbiddenException('CPF ou CNPJ já cadastrado.');
      }
    }

    if (currentEmail !== userDto.email) {
      userExists = null;
      userExists = await this.getUserByEmail(userDto.email);

      if (userExists) {
        throw new ForbiddenException(
          'E-mail já cadastrado, informe outro e-mail.',
        );
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const document = get(updateUserDto, 'document');

    if (document && !validateCPFCNPJ(document)) {
      throw new BadRequestException('CPF ou CNPJ está incorreto.');
    }

    const currentUser = await this.getById(id);

    await this.validateUniqueInformation(currentUser, updateUserDto);
    const user = this.userFactoryService.updateUser(updateUserDto);

    let imageNotChanged = null;
    let perfilPhotoUrl = null;

    if (!isEmpty(updateUserDto.perfilPhotoUrl)) {
      imageNotChanged = updateUserDto.perfilPhotoUrl.includes(
        `https://${env.AWS_BUCKET_NAME}.s3`,
      );

      perfilPhotoUrl = updateUserDto.perfilPhotoUrl;
      if (!imageNotChanged) {
        perfilPhotoUrl = await this.fileUseCase.uploadBase64ToS3(
          updateUserDto.perfilPhotoUrl,
          id,
        );
      }
    }

    try {
      await this.prismaService.user.update({
        where: { id },
        data: { ...user, perfilPhotoUrl },
      });
    } catch (error) {
      throw genericError;
    }

    return perfilPhotoUrl;
  }

  async pagination(paginationOptions: PaginationOptionsDto, user: User) {
    const mainWhere = {
      active: true,
      deletedAt: null,
      id: { not: user.id },
    };

    const where = {
      ...mainWhere,
      ...paginationOptions.where,
    };

    const itemCount = await this.prismaService.user.count({
      where,
    });

    const entities = await this.prismaService.user.findMany({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: {
        createdAt: paginationOptions.order,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
      where,
    });

    const showing = entities.length;

    const pageMetaDto = new PageMetaDto({
      showing,
      itemCount,
      paginationOptions,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async delete(id: string) {
    await this.getById(id);

    try {
      await this.prismaService.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw genericError;
    }
  }

  async findAllPermissionsOfUser(user: User) {
    try {
      const fullUser = await this.prismaService.user.findUnique({
        where: { id: user.id },
        include: {
          role: {
            include: {
              permissions: {
                include: { permission: { include: { menuItem: true } } },
              },
            },
          },
        },
      });

      const permissions = get(fullUser, 'role.permissions', []);
      return permissions;
    } catch (error) {
      throw new BadRequestException(
        'Ocorreu algo de errado. Por favor tente novamente mais tarde',
      );
    }
  }
}
