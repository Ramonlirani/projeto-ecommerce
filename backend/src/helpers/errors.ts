import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const genericError = new BadRequestException(
  'Erro inesperado. Tente novamente mais tarde.',
);

export const notFoundError = new NotFoundException(
  'Ops! Não foi possível encontrar o que você está procurando.',
);

export const unauthorizedError = new UnauthorizedException(
  'Ops! Acesso não autorizado.',
);
