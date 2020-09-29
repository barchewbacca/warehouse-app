import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Article } from '@warehouse-app/api-interfaces';
import { InventoryService } from '@warehouse-app/shared/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMapTo, takeUntil, tap } from 'rxjs/operators';

@Component({
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss'],
})
export class InventoryPageComponent implements OnDestroy {
  private destroyed$ = new Subject();
  private fileUpload$ = new BehaviorSubject({});

  @ViewChild('fileUploadInput')
  fileUploadInput: ElementRef;

  inventory$: Observable<Article[]> = this.fileUpload$.pipe(switchMapTo(this.inventoryService.getArticles()));

  constructor(private inventoryService: InventoryService) {}

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);

    this.inventoryService
      .uploadArticles(fileToUpload)
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => (this.fileUploadInput.nativeElement.value = ''))
      )
      .subscribe(() => this.fileUpload$.next({}));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
