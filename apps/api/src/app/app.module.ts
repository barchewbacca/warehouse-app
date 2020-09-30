import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryModule } from './inventory/inventory.module';
import { ProductsModule } from './products/products.module';

const CONNECTION_STRING = 'mongodb://localhost:27017/test';

@Module({
  imports: [MongooseModule.forRoot(CONNECTION_STRING), InventoryModule, ProductsModule],
})
export class AppModule {}
