import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Product } from '@warehouse-app/api-interfaces';
import { ProductsService } from '@warehouse-app/shared/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMapTo, takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnDestroy {
  @ViewChild('fileUploadInput')
  fileUploadInput: ElementRef;

  private destroyed$ = new Subject();
  private updateProducts$ = new BehaviorSubject({});

  products$: Observable<Product[]> = this.updateProducts$.pipe(switchMapTo(this.productsService.getProducts()));

  constructor(private productsService: ProductsService) {}

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);

    this.productsService
      .uploadConfigurations(fileToUpload)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => this.updateProducts$.next({}));
  }

  onProductOrdered(product: Product) {
    console.log('Product ordered', product);
    this.productsService.order(product).subscribe(() => this.updateProducts$.next({}));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
