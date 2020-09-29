import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article as ArticleEntity } from '@warehouse-app/api-interfaces';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find({}, '-_id id name stock').sort({ id: 1 }).exec();
  }

  async fileUpload(articles: ArticleEntity[]): Promise<Article[]> {
    const newArticles: Article[] = articles.map(
      ({ art_id, name, stock }) =>
        ({
          id: art_id,
          name,
          stock: +stock,
        } as Article)
    );

    return await Promise.all(
      newArticles.map(async ({ id, name, stock }) => {
        return await this.articleModel
          .findOneAndUpdate({ id }, { name, $inc: { stock } }, { useFindAndModify: false, upsert: true })
          .exec();
      })
    );
  }
}
