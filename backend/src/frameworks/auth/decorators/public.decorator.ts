import { SetMetadata } from '@nestjs/common';
import { env } from '@env';

export const Public = () => SetMetadata(env.PUBLIC_KEY, true);
