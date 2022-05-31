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

  updateAmount(product: Product, amount: number) {
    if (amount === 0) {
      this.removeFromCart(product);
      return;
    }
    this.cart = this.cart.map((cartProduct) =>
      cartProduct.id === product.id ? { ...cartProduct, amount } : cartProduct
    );
  }

  addToCart(product: Product) {
    product.amount = 1;
    this.cart = [...this.cart, product];
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(
      (cartProduct: Product) => cartProduct.id !== product.id
    );
    product.isInCart = false;
  }

  calculateTotalWithDiscount(total: number, discount: number) {
    const totalAfterDiscount = total - total * (discount / 100);
    return Math.round(totalAfterDiscount * 100) / 100;
  }

  calculateCartTotal(cart: Product[]) {
    const total =
      cart.reduce((n, { price, amount = 1 }) => n + price * amount, 0) || 0;
    return Math.round(total * 100) / 100;
  }

  getCartTotalWithDiscount() {
    const discount = this.localStorageService.get('discount');
    const total = this.calculateCartTotal(this.cart);

    if (discount) {
      return this.calculateTotalWithDiscount(total, Number(discount));
    } else {
      return total;
    }
  }

  manageProduct(product: Product) {
    product.isInCart = this.cart.some(
      (cartProduct: Product) => cartProduct.id === product.id
    );
  }
}
