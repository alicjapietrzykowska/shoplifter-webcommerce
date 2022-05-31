import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CartSummaryComponent } from './cart-summary.component';

const routes: Routes = [
  {
    path: '',
    component: CartSummaryComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [CartSummaryComponent],
})
export class CartSummaryModule {}
