import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@warehouse-app/api-interfaces';

@Component({
  selector: 'warehouse-app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products: Product[];
  @Output() ordered = new EventEmitter<Product>();

  handleOrderButtonClick(product: Product) {
    this.ordered.emit(product);
  }
}
