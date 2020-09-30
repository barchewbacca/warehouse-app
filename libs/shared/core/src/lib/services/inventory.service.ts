import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '@warehouse-app/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly inventoryEndpoint = '/api/inventory';

  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.inventoryEndpoint);
  }

  uploadArticles(file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(this.inventoryEndpoint, formData).pipe(map(() => true));
  }
}
