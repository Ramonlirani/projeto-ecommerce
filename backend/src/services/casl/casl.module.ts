import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../../frameworks/casl/casl-ability.factory';
import { UseCasesModule } from '@use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
