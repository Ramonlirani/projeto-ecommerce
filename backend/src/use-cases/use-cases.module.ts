import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DataServicesModule } from '../services/data-services/data-services.module';
import { MailServicesModule } from '../services/mail-services/mail-services.module';
import { UserFactoryService } from './user/user-factory.service';
import { UserUseCases } from './user/user.use-case';
import { FaqFactoryService } from './faq/faq-factory.service';
import { FaqUseCases } from './faq/faq.use-case';

import { AuthUseCases } from './auth/auth.use-case';
import { ConfigurationUseCases } from './configuration/configuration.use-case';
import { FileUseCases } from './file/file.use-case';
import { FaqCategoryUseCases } from './faq-category/faq-category.use-case';
import { FaqCategoryFactoryService } from './faq-category/faq-category-factory.service';
import { ContactUseCases } from './contact/contact.use-case';
import { RoleUseCases } from './role/role.use-case';
import { RoleFactoryService } from './role/role-factory.service';
import { MenuItemUseCases } from './menu-item/menu-item.use-case';
import { ProductCategoryUseCases } from './product-category/product-category.use-case';
import { ProductCategoryFactoryService } from './product-category/product-category-factory.service';
import { SubCategoryUseCases } from './sub-category/subcategory.use-case';
import { SubCategoryFactoryService } from './sub-category/subcategory-factory.service';
import { ProductFactoryService } from './product/product-factory.service';
import { ProductUseCases } from './product/product.use-case';

@Module({
  imports: [MailServicesModule, DataServicesModule, JwtModule],
  providers: [
    AuthUseCases,
    ConfigurationUseCases,
    FaqFactoryService,
    FaqUseCases,
    FaqCategoryUseCases,
    FaqCategoryFactoryService,
    FileUseCases,
    MenuItemUseCases,
    ProductCategoryUseCases,
    ProductCategoryFactoryService,
    ProductUseCases,
    ProductFactoryService,
    RoleFactoryService,
    RoleUseCases,
    SubCategoryUseCases,
    SubCategoryFactoryService,
    UserFactoryService,
    UserUseCases,
    ContactUseCases,
  ],
  exports: [
    AuthUseCases,
    ConfigurationUseCases,
    FaqFactoryService,
    FaqUseCases,
    FaqCategoryUseCases,
    FaqCategoryFactoryService,
    FileUseCases,
    MenuItemUseCases,
    ProductCategoryUseCases,
    ProductCategoryFactoryService,
    ProductUseCases,
    ProductFactoryService,
    RoleFactoryService,
    RoleUseCases,
    SubCategoryUseCases,
    SubCategoryFactoryService,
    UserFactoryService,
    UserUseCases,
    ContactUseCases,
  ],
})
export class UseCasesModule {}
