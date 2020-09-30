import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  configurationId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
