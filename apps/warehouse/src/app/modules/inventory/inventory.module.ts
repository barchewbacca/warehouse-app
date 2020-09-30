import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryPageComponent } from './containers/inventory-page/inventory-page.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [InventoryPageComponent, InventoryListComponent],
  imports: [CommonModule, InventoryRoutingModule],
})
export class InventoryModule {}
