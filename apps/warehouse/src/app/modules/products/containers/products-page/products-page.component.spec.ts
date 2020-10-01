import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from '@warehouse-app/api-interfaces';
import { ProductsService } from '@warehouse-app/shared/core';
import { of } from 'rxjs';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductsPageComponent } from './products-page.component';

const mockProduct: Product = {
  id: 'test-id',
  name: 'test-name',
  price: 'test-price',
  amount: 29,
};

class PageObject {
  constructor(private fixture: ComponentFixture<ProductsPageComponent>) {}

  get fileUploadInput(): HTMLInputElement {
    return this.fixture.debugElement.query(By.css('[data-qa="file-upload-input"]')).nativeElement;
  }
}

describe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let pageObject: PageObject;

  const productsServiceMock = {
    getProducts: jest.fn().mockResolvedValue([mockProduct]),
    uploadConfigurations: jest.fn().mockReturnValue(of({})),
    order: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductsPageComponent, ProductListComponent],
        providers: [
          {
            provide: ProductsService,
            useValue: productsServiceMock,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload products', () => {
    const fakeChangeEvent = new Event('change');
    pageObject.fileUploadInput.dispatchEvent(fakeChangeEvent);
    expect(productsServiceMock.uploadConfigurations).toHaveBeenCalled();
    expect(pageObject.fileUploadInput.value).toEqual('');
  });

  it('should upload products', () => {
    // act
    component.onProductOrdered(mockProduct);

    // assert
    expect(productsServiceMock.order).toHaveBeenCalledWith(mockProduct);
  });
});
