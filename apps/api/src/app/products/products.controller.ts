import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product as ProductEntity } from '@warehouse-app/api-interfaces';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
  @UseInterceptors(FileInterceptor('file'))
  async uploadConfiguration(@UploadedFile() file) {
    const configurations = JSON.parse(file.buffer).products as ProductEntity[];
    this.productsService.fileUpload(configurations);
  }

  @Get('products')
  async getProducts(): Promise<ProductEntity[]> {
    return this.productsService.findAll();
  }

  @Delete('products/:productId')
  async order(@Param() params) {
    this.productsService.order(params.productId);
  }
}
