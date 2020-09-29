import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product as ProductEntity } from '@warehouse-app/api-interfaces';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Article } from '../inventory/schemas/article.schema';
import { Configuration, Unit } from './schemas/configuration.schema';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Configuration.name) private configurationModel: Model<Configuration>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Article.name) private articleModel: Model<Article>
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().exec();

    return await Promise.all(
      products.map(async ({ _id, name, price, configurationId }) => {
        const { configuration } = await this.configurationModel.findOne({ id: configurationId }).exec();

        const articleCapacity = await Promise.all(
          configuration.map(async ({ amount, articleId }) => {
            const { stock } = await this.articleModel.findOne({ id: articleId }).exec();
            return Math.floor(stock / amount);
          })
        );

        return { id: _id, name, price, amount: Math.min(...articleCapacity) } as ProductEntity;
      })
    );
  }

  async fileUpload(configurationList: ProductEntity[]) {
    console.log('Products upload', configurationList);
    configurationList.forEach(async ({ name, price, contain_articles }) => {
      const product = await this.productModel.findOne({ name }).exec();
      const configurationId = product ? product.configurationId : nanoid();
      console.log('Product found', product);

      if (!product) {
        this.productModel.create({ name, price, configurationId });
      }

      const configuration: Unit[] = contain_articles.map(
        item => ({ articleId: item.art_id, amount: +item.amount_of } as Unit)
      );

      this.configurationModel
        .findOneAndUpdate({ id: configurationId }, { configuration }, { useFindAndModify: false, upsert: true })
        .exec();
    });
  }

  async order(productId: string) {
    const { configurationId } = await this.productModel.findOne({ _id: productId }).exec();
    console.log('Produccct', configurationId);
    const { configuration } = await this.configurationModel.findOne({ id: configurationId });
    console.log('Configggg', configuration);
    configuration.forEach(async ({ articleId, amount }) => {
      const article = await this.articleModel.findOneAndUpdate(
        { id: articleId },
        { $inc: { stock: -amount } },
        { useFindAndModify: false, upsert: true }
      );
    });
  }
}
