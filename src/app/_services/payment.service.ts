import { Injectable } from '@angular/core';
import { environment } from '@env';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  strikeCheckout: any = null;
  private _paymentStatus: BehaviorSubject<boolean>;

  constructor() {
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

  initConfig(amount: string): IPayPalConfig {
    const t = this;
    const payPalConfig = {
      currency: 'USD',
      clientId: environment.paypalClientId,
      createOrderOnClient: () =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: amount,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: amount,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onClientAuthorization: () => {
        t.paymentStatus = true;
      },
    };
    return payPalConfig as IPayPalConfig;
  }
}
