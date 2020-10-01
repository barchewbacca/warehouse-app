import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from '@warehouse-app/api-interfaces';
import { ProductListComponent } from './product-list.component';

const mockProduct: Product = {
  id: 'test-id',
  name: 'test-name',
  price: 'test-price',
  amount: 29,
};

class PageObject {
  constructor(private fixture: ComponentFixture<ProductListComponent>) {}

  get orderButton(): HTMLButtonElement {
    return this.fixture.debugElement.query(By.css('[data-qa="order-button"]')).nativeElement;
  }
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let pageObject: PageObject;
  let emitSpy;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListComponent],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = [mockProduct];
    emitSpy = jest.spyOn(component.ordered, 'emit');
    pageObject = new PageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should orders product on button click', () => {
    const fakeClickEvent = new Event('click');
    pageObject.orderButton.dispatchEvent(fakeClickEvent);
    expect(emitSpy).toHaveBeenCalled();
  });
});
