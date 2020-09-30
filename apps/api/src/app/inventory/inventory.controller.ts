import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleDto } from './dto/article.dto';
import { InventoryService } from './inventory.service';
import { Article } from './schemas/article.schema';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('inventory')
  @UseInterceptors(FileInterceptor('file'))
  async uploadInventory(@UploadedFile() file) {
    const inventory = JSON.parse(file.buffer).inventory as ArticleDto[];
    await this.inventoryService.fileUpload(inventory);
  }

  @Get('inventory')
  async getInventory(): Promise<Article[]> {
    return await this.inventoryService.getInventory();
  }
}
