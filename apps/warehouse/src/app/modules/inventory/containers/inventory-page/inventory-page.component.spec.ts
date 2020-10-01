import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Article } from '@warehouse-app/api-interfaces';
import { InventoryService } from '@warehouse-app/shared/core';
import { of } from 'rxjs';
import { InventoryListComponent } from '../../components/inventory-list/inventory-list.component';
import { InventoryPageComponent } from './inventory-page.component';

const mockArticle: Article = {
  id: '123',
  name: 'lamp',
  stock: 10,
} as Article;

class PageObject {
  constructor(private fixture: ComponentFixture<InventoryPageComponent>) {}

  get fileUploadInput(): HTMLInputElement {
    return this.fixture.debugElement.query(By.css('[data-qa="file-upload-input"]')).nativeElement;
  }
}

describe('InventoryPageComponent', () => {
  let component: InventoryPageComponent;
  let fixture: ComponentFixture<InventoryPageComponent>;
  let pageObject: PageObject;

  const inventoryServiceMock = {
    getArticles: jest.fn().mockResolvedValue([mockArticle]),
    uploadArticles: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InventoryPageComponent, InventoryListComponent],
        providers: [
          {
            provide: InventoryService,
            useValue: inventoryServiceMock,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPageComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload inventory', () => {
    const fakeChangeEvent = new Event('change');
    pageObject.fileUploadInput.dispatchEvent(fakeChangeEvent);
    expect(inventoryServiceMock.uploadArticles).toHaveBeenCalled();
    expect(pageObject.fileUploadInput.value).toEqual('');
  });
});
