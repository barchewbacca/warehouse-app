import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InventoryPageComponent } from './containers/inventory-page/inventory-page.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [InventoryPageComponent],
  imports: [CommonModule, InventoryRoutingModule],
})
export class InventoryModule {}
