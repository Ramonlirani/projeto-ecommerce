import { Module } from '@nestjs/common';
import { DataServicesModule } from '../services/data-services/data-services.module';
import { CaslModule } from '../services/casl/casl.module';
import { UseCasesModule } from '../use-cases/use-cases.module';
import { HealthController } from './controllers/health/health.controller';
import { UserController } from './controllers/user/user.controller';
import { FaqController } from './controllers/faq/faq.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { ConfigurationController } from './controllers/configuration/configuration.controller';
import { FaqCategoryController } from './controllers/faq-category/faq-category.controller';
import { FileController } from './controllers/file/file.controller';
import { ContactController } from './controllers/contact/contact.controller';
import { RoleController } from './controllers/role/role.controller';
import { MenuItemController } from './controllers/menu-item/menu-item.controller';
import { CombinedController } from './controllers/combined/combined.controller';
import { ProductCategoryController } from './controllers/product-category/product-category.controller';
import { SubCategoryController } from './controllers/sub-category/sub-category.controller';
import { ProductController } from './controllers/product/product.controller';

@Module({
  imports: [DataServicesModule, UseCasesModule, CaslModule],
  controllers: [
    AuthController,
    CombinedController,
    ConfigurationController,
    ContactController,
    FaqCategoryController,
    FaqController,
    FileController,
    HealthController,
    MenuItemController,
    ProductCategoryController,
    ProductController,
    RoleController,
    SubCategoryController,
    UserController,
  ],
})
export class HttpModule {}
