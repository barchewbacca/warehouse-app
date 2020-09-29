import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@warehouse-app/shared/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsPageComponent } from './containers/products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsPageComponent, ProductListComponent],
  imports: [CommonModule, ProductsRoutingModule, CoreModule],
})
export class ProductsModule {}
