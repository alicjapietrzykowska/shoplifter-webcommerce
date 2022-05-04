import { Injectable } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { LocalStorageService } from '@services/localStorage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: BehaviorSubject<Product[]>;
  private _cartTotal: BehaviorSubject<number>;
  constructor(private localStorageService: LocalStorageService) {
    const localCart = this.localStorageService.get('cart') || [];
    const localCartTotal = this.calculateCartTotal(localCart);
    this._cart = new BehaviorSubject<Product[]>(localCart);
    this._cartTotal = new BehaviorSubject<number>(localCartTotal);
  }

  get cart(): Product[] {
    return this._cart.value;
  }

  set cart(newCart: Product[]) {
    this.cartTotal = this.calculateCartTotal(newCart);
    this._cart.next(newCart);
    this.localStorageService.add('cart', newCart);
  }

  get cart$(): Observable<Product[]> {
    return this._cart.asObservable();
  }

  get cartTotal(): number {
    return this._cartTotal.value;
  }

  set cartTotal(newTotal: number) {
    this._cartTotal.next(newTotal);
  }

  addToCart(product: Product) {
    this.cart = [...this.cart, product];
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(
      (wishProduct: Product) => wishProduct.id !== product.id
    );
  }

  calculateCartTotal(cart: Product[]) {
    return (
      cart.reduce((n, { price, amount = 1 }) => n + price * amount, 0) || 0
    );
  }

  manageProduct(product: Product) {
    product.isInCart = this.cart.some(
      (cartProduct: Product) => cartProduct.id === product.id
    );
  }
}
