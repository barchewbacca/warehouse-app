import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InventoryService } from './services/inventory.service';
import { ProductsService } from './services/products.service';

export * from './services/inventory.service';
export * from './services/products.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [InventoryService, ProductsService],
  exports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
