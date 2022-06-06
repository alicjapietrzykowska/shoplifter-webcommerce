import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { environment } from '@env';
import { PaymentService } from '@services/payment.service';
import { LocalStorageService } from '@services/localStorage.service';
import { shippingOptions } from 'assets/static/shipping.static';
import { Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Output() confirmPayment = new EventEmitter();
  strikeCheckout: any = null;
  address: any = {};
  shippingType: any = {};
  totalWithDiscount = '0';

  private cartSubscription$: Subscription | undefined;

  constructor(
    private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) {}

  checkout(amount: string) {
    this.paymentService.checkout(Number(amount));
  }

  manageCart() {
    this.totalWithDiscount = this.cartService
      .getCartTotalWithDiscount()
      .toFixed(2);

    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.totalWithDiscount = this.cartService
        .getCartTotalWithDiscount()
        .toFixed(2);
    });
  }

  ngOnInit() {
    this.manageCart();
    this.address = this.localStorageService.get('shipping');
    if (this.address) {
      this.shippingType = shippingOptions.find(
        (option) => option.price === this.address.shipping
      );
    }
    this.paymentService.stripePaymentGateway();
    this.paymentService.paymentStatus$.subscribe((res) => {
      if (res) {
        this.confirmPayment.emit();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }
}
