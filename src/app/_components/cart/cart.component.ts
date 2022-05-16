import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cartTotal = 0;
  private cartSubscription$: Subscription | undefined;

  constructor(private cartService: CartService) {}

  manageCart() {
    this.products = [...this.cartService.cart];
    this.cartTotal = this.cartService.cartTotal;
    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.products = [...cart];
      this.cartTotal = this.cartService.cartTotal;
    });
  }

  ngOnInit() {
    this.manageCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }
}
