import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article as ArticleEntity } from '@warehouse-app/api-interfaces';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async fileUpload(articles: ArticleEntity[]) {
    const newArticles: Article[] = articles.map(({ art_id, name, stock }) => ({
      id: art_id,
      name,
      stock: +stock,
    })) as Article[];

    newArticles.forEach(({ id, name, stock }) => {
      this.articleModel
        .findOneAndUpdate({ id }, { name, $inc: { stock } }, { useFindAndModify: false, upsert: true })
        .exec();
    });
  }
}
