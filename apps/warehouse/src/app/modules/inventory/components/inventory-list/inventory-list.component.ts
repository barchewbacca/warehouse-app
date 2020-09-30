import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from '@warehouse-app/api-interfaces';

@Component({
  selector: 'warehouse-app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryListComponent {
  @Input() inventory: Article[];
}
