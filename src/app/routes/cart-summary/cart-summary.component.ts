import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '@interfaces/productDto';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  cartLength = 0;
  cartTotal = 0;
  cart: Product[] = [];

  rows: Product[] = [];
  columns = [
    { prop: 'title', name: this.translate.instant('cart.product') },
    { prop: 'category', name: this.translate.instant('cart.category') },
    { prop: 'price', name: this.translate.instant('cart.price') },
    { prop: 'amount', name: this.translate.instant('cart.amount') },
  ];

  private cartSubscription$: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private translate: TranslateService
  ) {}

  manageCart() {
    this.cartTotal = this.cartService.cartTotal;
    this.cart = this.cartService.cart;
    this.rows = this.cart;
    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartTotal = this.cartService.cartTotal;
      this.cart = cart;
      this.rows = this.cart;
    });
  }

  ngOnInit() {
    this.manageCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }
}
