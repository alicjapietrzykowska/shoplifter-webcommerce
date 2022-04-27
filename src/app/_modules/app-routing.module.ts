import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '@routes/landing/landing.component';

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
    ],
  },
  // { path: '403', component: Page403Component },
];

export interface Menus {
  path: string;
  slug: string;
  visible?: boolean;
  children?: Menus[];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
