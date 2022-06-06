import { Injectable } from '@angular/core';
import { environment } from '@env';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  strikeCheckout: any = null;
  private _paymentStatus: BehaviorSubject<boolean>;

  constructor(private translate: TranslateService) {
    this._paymentStatus = new BehaviorSubject<boolean>(false);
  }

  get paymentStatus(): boolean {
    return this._paymentStatus.value;
  }

  set paymentStatus(nextState: boolean) {
    this._paymentStatus.next(nextState);
  }

  get paymentStatus$(): Observable<boolean> {
    return this._paymentStatus.asObservable();
  }

  checkout(amount: number) {
    const t = this;
    const checkout = (<any>window).StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        t.paymentStatus = true;
      },
    });

    checkout.open({
      name: this.translate.instant('general.appName'),
      description: this.translate.instant('general.payStripe'),
      amount: amount * 100,
    });
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: environment.stripeKey,
          locale: 'auto',
        });
      };

      window.document.body.appendChild(scr);
    }
  }
}
