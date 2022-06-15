import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '@routes/landing/landing.component';
import { Page500Component } from '@routes/pages/page500/page500.component';
import { PagesModule } from '@routes/pages/pages.module';
import { SharedModule } from '@modules/shared.module';
import { ContactComponent } from '@routes/pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../routes/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'product-list',
        loadChildren: () =>
          import('../routes/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../routes/cart-summary/cart-summary.module').then(
            (m) => m.CartSummaryModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('../routes/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
    ],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'api-error', component: Page500Component },
  { path: '**', redirectTo: '' },
];

export interface Menus {
  path: string;
  slug: string;
  visible?: boolean;
  children?: Menus[];
}

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    PagesModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
