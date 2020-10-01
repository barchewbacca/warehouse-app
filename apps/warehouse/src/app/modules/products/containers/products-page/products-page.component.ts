import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '@warehouse-app/api-interfaces';
import { ProductsService } from '@warehouse-app/shared/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent {
  private updateProducts$ = new BehaviorSubject({});

  @ViewChild('fileUploadInput')
  fileUploadInput: ElementRef;

  products$: Observable<Product[]> = this.updateProducts$.pipe(switchMapTo(this.productsService.getProducts()));

  constructor(private productsService: ProductsService) {}

  handleFileInput(fileToUpload: File) {
    this.productsService
      .uploadConfigurations(fileToUpload)
      .pipe(tap(() => (this.fileUploadInput.nativeElement.value = '')))
      .subscribe(_ => this.updateProducts$.next({}));
  }

  onProductOrdered(product: Product) {
    this.productsService.order(product).subscribe(() => this.updateProducts$.next({}));
  }
}
