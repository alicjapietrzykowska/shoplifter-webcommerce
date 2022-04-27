import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '@interfaces/productDto';
import { LoaderService } from '@services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _allProducts: BehaviorSubject<Product[]>;
  constructor(private http: HttpClient, private loaderService: LoaderService) {
    this._allProducts = new BehaviorSubject<Product[]>([]);
  }

  get allProducts(): Product[] {
    return this._allProducts.value;
  }

  set allProducts(nextState: Product[]) {
    this._allProducts.next(nextState);
  }

  get allProducts$(): Observable<Product[]> {
    return this._allProducts.asObservable();
  }

  getProducts(limit: number) {
    this.loaderService.isLoading = true;
    this.http
      .get<Product[]>(`${environment.APIUrl}/products?limit=${limit}`)
      .subscribe((res) => {
        this.allProducts = res;
        console.log(this.allProducts);
        this.loaderService.isLoading = false;
      });
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
