import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Unit extends Document {
  @Prop()
  articleId: string;

  @Prop()
  amount: number;
}

@Schema()
export class Configuration extends Document {
  @Prop()
  id: string;

  @Prop([Unit])
  configuration: Unit[];
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
