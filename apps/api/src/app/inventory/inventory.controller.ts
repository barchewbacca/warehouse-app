import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Article as ArticleEntity } from '@warehouse-app/api-interfaces';
import { InventoryService } from './inventory.service';
import { Article } from './schemas/article.schema';

@Controller()
// @UseInterceptors(InventoryInterceptor)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('inventory')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file) {
    const inventory = JSON.parse(file.buffer).inventory as ArticleEntity[];
    this.inventoryService.fileUpload(inventory);
  }

  @Get('inventory')
  async getInventory(): Promise<Article[]> {
    return this.inventoryService.findAll();
  }
}
