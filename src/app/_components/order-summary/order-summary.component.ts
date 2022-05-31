import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';
import { discountCodes } from 'assets/static/discounts.static';
import { LocalStorageService } from '@services/localStorage.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  cartLength = 0;
  cartTotal = 0;
  totalWithDiscount = 0;
  cart: Product[] = [];
  discountCoupon = '';
  discount = 0;

  private cartSubscription$: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {}

  checkDiscount() {
    this.discountCoupon = this.discountCoupon.trim();
    const codeDiscount = discountCodes.find(
      (discount) =>
        discount.code.toLowerCase() === this.discountCoupon.toLowerCase()
    );
    if (codeDiscount) {
      this.discount = codeDiscount.value;
      this.localStorageService.add('discount', String(codeDiscount.value));
      this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
    }
  }

  removeDiscount() {
    this.localStorageService.remove('discount');
    this.discount = 0;
    this.discountCoupon = '';
    this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
  }

  manageCart() {
    this.cartTotal = this.cartService.cartTotal;
    this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();

    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartTotal = this.cartService.cartTotal;
    });
  }

  ngOnInit() {
    this.manageCart();
    const localDiscount = this.localStorageService.get('discount');
    if (localDiscount) {
      this.discount = Number(localDiscount);
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }
}
