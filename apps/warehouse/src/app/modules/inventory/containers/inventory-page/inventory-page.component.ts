import { Component, ElementRef, ViewChild } from '@angular/core';
import { Article } from '@warehouse-app/api-interfaces';
import { InventoryService } from '@warehouse-app/shared/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

@Component({
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss'],
})
export class InventoryPageComponent {
  private fileUpload$ = new BehaviorSubject({});

  @ViewChild('fileUploadInput')
  fileUploadInput: ElementRef;

  inventory$: Observable<Article[]> = this.fileUpload$.pipe(switchMapTo(this.inventoryService.getArticles()));

  constructor(private inventoryService: InventoryService) {}

  handleFileInput(fileToUpload: File) {
    this.inventoryService
      .uploadArticles(fileToUpload)
      .pipe(tap(() => (this.fileUploadInput.nativeElement.value = '')))
      .subscribe(() => this.fileUpload$.next({}));
  }
}
