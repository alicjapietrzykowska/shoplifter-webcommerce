import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { map, Observable } from 'rxjs';
import { Product } from '@interfaces/productDto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${environment.APIUrl}/products`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.APIUrl}/products/categories`);
  }

  getProductsInCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.APIUrl}/products/category/${category}`
    );
  }

  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.APIUrl}/products/${id}`);
  }
}
