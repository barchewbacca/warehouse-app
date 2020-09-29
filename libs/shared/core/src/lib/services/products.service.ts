import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@warehouse-app/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productsEndpoint = '/api/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsEndpoint);
  }

  uploadConfigurations(file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(this.productsEndpoint, formData).pipe(map(_ => true));
  }

  order(product: Product) {
    return this.httpClient.delete(`${this.productsEndpoint}/${product.id}`);
  }
}
