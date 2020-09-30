import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  stock: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
