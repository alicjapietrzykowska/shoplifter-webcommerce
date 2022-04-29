import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Product } from '@interfaces/productDto';
import { LocalStorageService } from '@services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private localStorageService: LocalStorageService) {}

  manageProduct(product: Product) {
    const wishlist = this.localStorageService.get('wishlist') || [];
    product.isFavorite = wishlist.some(
      (wishProduct: Product) => wishProduct.id === product.id
    );
  }

  getFullWishlist() {
    return this.localStorageService.get('wishlist') || [];
  }

  updateWishList(newWishlist: Product[]) {
    this.localStorageService.add('wishlist', newWishlist);
  }
}
