import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { PageMetaDto } from '@core/dtos/page-meta.dto';
import { PageDto } from '@core/dtos/page.dto';
import { genericError, notFoundError } from '@helpers/errors';
import { IBaseFactory } from '@core/entities/base-factory.entity';

export interface ListAllProps {
  props?: any;
}

@Injectable()
export class BaseUseCases<Entity, CreateDto, UpdateDto> {
  public prismaService = new PrismaService();

  constructor(
    private readonly instanceFactory: IBaseFactory<Entity, CreateDto, UpdateDto>,
    private modelName: string,
  ) {}

  async listAll({ props = null }: ListAllProps = { props: null }) {
    if (props) {
      return this.prismaService[this.modelName].findMany(props);
    }

    return this.prismaService[this.modelName].findMany();
  }

  async pagination(paginationOptions: PaginationOptionsDto) {
    const itemCount = await this.prismaService[this.modelName].count({
      where: paginationOptions.where,
    });

    const entities = await this.prismaService[this.modelName].findMany({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: {
        createdAt: paginationOptions.order,
      },
      where: paginationOptions.where,
    });

    const showing = entities.length;

    const pageMetaDto = new PageMetaDto({
      showing,
      itemCount,
      paginationOptions,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async getById(id: string): Promise<Entity> {
    const entity = await this.prismaService[this.modelName].findUnique({
      where: { id },
    });

    if (!entity) throw notFoundError;

    return entity;
  }

  async create(data: CreateDto): Promise<void> {
    try {
      const dataFactory = this.instanceFactory.create(data);

      await this.prismaService[this.modelName].create({ data: dataFactory });
    } catch (error) {
      throw genericError;
    }
  }

  async update(id: string, data: UpdateDto): Promise<Entity> {
    try {
      const dataFactory = this.instanceFactory.update(data);

      return this.prismaService[this.modelName].update({
        where: { id },
        data: dataFactory,
      });
    } catch (error) {
      throw genericError;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);

      await this.prismaService[this.modelName].delete({ where: { id } });
    } catch (error) {
      throw genericError;
    }
  }

  async deleteWithTimestamp(id: string) {
    try {
      await this.getById(id);

      await this.prismaService[this.modelName].update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw genericError;
    }
  }
}
