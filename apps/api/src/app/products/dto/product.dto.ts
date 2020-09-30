import { ConfigurationDto } from './configuration.dto';

export class ProductDto {
  readonly id?: string;
  readonly name: string;
  readonly price: string;
  readonly contain_articles?: ConfigurationDto[];
  readonly amount?: number;
}
