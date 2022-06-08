import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { NgxPayPalModule } from 'ngx-paypal';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
  {
    path: ':tab',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxPayPalModule,
  ],
  declarations: [
    CheckoutComponent,
    ShippingFormComponent,
    PaymentComponent,
    ReviewComponent,
  ],
})
export class CheckoutModule {}
