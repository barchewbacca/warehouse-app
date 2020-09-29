import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../inventory/schemas/article.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Configuration, ConfigurationSchema } from './schemas/configuration.schema';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Configuration.name, schema: ConfigurationSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
