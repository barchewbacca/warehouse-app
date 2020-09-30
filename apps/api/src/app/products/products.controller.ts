import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
  @UseInterceptors(FileInterceptor('file'))
  async uploadConfiguration(@UploadedFile() file) {
    const configurations = JSON.parse(file.buffer).products as ProductDto[];
    await this.productsService.fileUpload(configurations);
  }

  @Get('products')
  async getProducts(): Promise<ProductDto[]> {
    return await this.productsService.findAll();
  }

  @Delete('products/:productId')
  async orderProduct(@Param() params) {
    await this.productsService.order(params.productId);
  }
}
