import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDto } from './dto/article.dto';
import { Article } from './schemas/article.schema';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  async getInventory(): Promise<Article[]> {
    return await this.articleModel.find({}, '-_id id name stock').sort({ id: 1 }).exec();
  }

  async fileUpload(articles: ArticleDto[]): Promise<Article[]> {
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
