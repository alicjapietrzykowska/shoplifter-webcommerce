import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  throwError,
} from 'rxjs';
import { Product } from '@interfaces/productDto';
import { LoaderService } from '@services/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _allProducts: BehaviorSubject<Product[]>;
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private router: Router
  ) {
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

  manageError(error: HttpErrorResponse) {
    this.loaderService.isLoading = false;
    this.router.navigate(['/api-error']);
    return throwError(() => new Error(error.message));
  }

  getProducts(limit: number) {
    this.loaderService.isLoading = true;
    this.http
      .get<Product[]>(`${environment.APIUrl}/products?limit=${limit}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.manageError(error);
        })
      )
      .subscribe((res) => {
        this.allProducts = res;
        this.loaderService.isLoading = false;
      });
  }

  getAllCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.APIUrl}/products/categories`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.manageError(error);
        })
      );
  }

  getProductsInCategory(category: string): Observable<Product[]> {
    this.loaderService.isLoading = true;
    return this.http
      .get<Product[]>(`${environment.APIUrl}/products/category/${category}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.manageError(error);
        }),
        finalize(() => (this.loaderService.isLoading = false))
      );
  }

  getProductDetails(id: number): Observable<Product> {
    this.loaderService.isLoading = true;
    return this.http.get<Product>(`${environment.APIUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.manageError(error);
      }),
      finalize(() => (this.loaderService.isLoading = false))
    );
  }
}
