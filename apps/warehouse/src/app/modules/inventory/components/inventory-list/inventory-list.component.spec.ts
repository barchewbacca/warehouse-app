import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Article } from '@warehouse-app/api-interfaces';
import { InventoryListComponent } from './inventory-list.component';

const mockArticle: Article = {
  id: '1',
  name: 'leg',
  stock: 12,
};
const mockArticles = [mockArticle];

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InventoryListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    component.inventory = mockArticles;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
