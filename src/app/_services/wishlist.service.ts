import { Injectable } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { LocalStorageService } from '@services/localStorage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private _wishlist: BehaviorSubject<Product[]>;
  constructor(private localStorageService: LocalStorageService) {
    const localWishlist = this.localStorageService.get('wishlist') || [];
    this._wishlist = new BehaviorSubject<Product[]>(localWishlist);
  }

  get wishlist(): Product[] {
    return this._wishlist.value;
  }

  set wishlist(newWishlist: Product[]) {
    this._wishlist.next(newWishlist);
    this.localStorageService.add('wishlist', newWishlist);
  }

  get wishlist$(): Observable<Product[]> {
    return this._wishlist.asObservable();
  }

  addToWishList(product: Product) {
    this.wishlist = [...this.wishlist, product];
  }

  removeFromWishList(product: Product) {
    this.wishlist = this.wishlist.filter(
      (wishProduct: Product) => wishProduct.id !== product.id
    );
  }

  manageProduct(product: Product) {
    product.isFavorite = this.wishlist.some(
      (wishProduct: Product) => wishProduct.id === product.id
    );
  }
}
