import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';
import { discountCodes } from 'assets/static/discounts.static';
import { LocalStorageService } from '@services/localStorage.service';
import { Discount } from '@interfaces/discountDto';
import { shippingOptions } from 'assets/static/shipping.static';
import { Shipping } from '@interfaces/shippingDto';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  @Input() readonly: boolean = false;
  @Input() shipping!: number;

  cartLength = 0;
  cartTotal = 0;
  totalWithDiscount = 0;
  cart: Product[] = [];
  discountCoupon = '';
  discount!: Discount | undefined;
  shippingType!: Shipping;

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
      this.discount = codeDiscount;
      this.localStorageService.add('discount', codeDiscount);
      this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
    }
  }

  removeDiscount() {
    this.localStorageService.remove('discount');
    this.discount = undefined;
    this.discountCoupon = '';
    this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
  }

  manageCart() {
    this.cartTotal = this.cartService.cartTotal;
    this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();

    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartTotal = this.cartService.cartTotal;
      this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
    });
  }

  manageShippingCost() {
    this.cartService.shippingCost = this.shipping;
    this.totalWithDiscount = this.cartService.getCartTotalWithDiscount();
  }

  ngOnInit() {
    this.manageCart();
    const localDiscount: Discount | undefined =
      this.localStorageService.get('discount');
    if (localDiscount) {
      this.discount = localDiscount;
      this.discountCoupon = localDiscount.code;
    }

    const address = this.localStorageService.get('shipping');
    if (address) {
      this.shipping =
        shippingOptions.find((option) => option.price === address.shipping)
          ?.price || 0;
      this.manageShippingCost();
    }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }

  ngOnChanges() {
    this.manageShippingCost();
  }
}
