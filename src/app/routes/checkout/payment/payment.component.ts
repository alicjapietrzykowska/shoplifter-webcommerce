import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { PaymentService } from '@services/payment.service';
import { Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';
import { IPayPalConfig } from 'ngx-paypal';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Output() confirmPayment = new EventEmitter();
  strikeCheckout: any = null;
  totalWithDiscount = '0';
  public payPalConfig?: IPayPalConfig;

  private cartSubscription$: Subscription | undefined;

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService
  ) {}

  manageCart() {
    this.totalWithDiscount = this.cartService
      .getCartTotalWithDiscount()
      .toFixed(2);
    this.payPalConfig = this.paymentService.initConfig(this.totalWithDiscount);

    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.totalWithDiscount = this.cartService
        .getCartTotalWithDiscount()
        .toFixed(2);
      this.payPalConfig = this.paymentService.initConfig(
        this.totalWithDiscount
      );
    });
  }

  ngOnInit() {
    this.manageCart();
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
