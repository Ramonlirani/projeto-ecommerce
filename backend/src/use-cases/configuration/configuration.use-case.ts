import { genericError, notFoundError } from '@helpers/errors';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

interface Configuration {
  [key: string]: string;
}

@Injectable()
export class ConfigurationUseCases {
  constructor(private prismaService: PrismaService) {}

  async getByKey(key: string) {
    try {
      return this.prismaService.configuration.findUnique({ where: { key } });
    } catch (error) {
      throw notFoundError;
    }
  }

  async filter(key: string[]) {
    try {
      let configurations = [];
      if (key && key.length > 0) {
        configurations = await this.prismaService.configuration.findMany({
          where: {
            key: {
              in: key,
            },
          },
        });
      } else {
        configurations = await this.prismaService.configuration.findMany();
      }

      return configurations.reduce(
        (a: any, v: any) => ({ ...a, [v.key]: v.value }),
        {},
      );
    } catch (error) {
      throw genericError;
    }
  }

  async save(data: Configuration) {
    const promises = Object.keys(data).map((key) => {
      return this.prismaService.configuration.upsert({
        where: { key },
        update: { value: data[key] },
        create: { key, value: data[key] },
      });
    });

    await Promise.all(promises);
  }

  async deleteByKey(key: string) {
    try {
      return this.prismaService.configuration.delete({ where: { key } });
    } catch (error) {
      throw notFoundError;
    }
  }

  async loadCompanyConfiguration() {
    const keys = [
      'businessName',
      'fantasyName',
      'phone',
      'whatsApp',
      'address',
      'city',
      'state',
      'cnpj',
      'instagram',
      'youtube',
      'facebook',
    ];

    return this.filter(keys);
  }
}
