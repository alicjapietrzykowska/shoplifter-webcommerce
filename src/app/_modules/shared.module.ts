import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '@components/header/header.component';
import { AngularMaterialModule } from '@modules/angular-material.module';
import { MenuComponent } from '@components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { DropmenuComponent } from '@components/dropmenu/dropmenu.component';
import { ProductOverviewComponent } from '@components/product-overview/product-overview.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from '@components/cart/cart.component';
import { CartProductComponent } from '@components/cart/cart-product/cart-product.component';
import { ConfirmModalComponent } from '@components/confirm-modal/confirm-modal.component';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { FooterComponent } from '@components/footer/footer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AmountComponent } from '@components/amount/amount.component';
import { OrderSummaryComponent } from '@components/order-summary/order-summary.component';
import { InlineErrorsComponent } from '@components/inlineErrors/inlineErrors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxDatatableModule,
    TranslateModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TranslateModule,
    ProductOverviewComponent,
    AngularMaterialModule,
    NgxDatatableModule,
    CartComponent,
    CartProductComponent,
    ConfirmModalComponent,
    AmountComponent,
    OrderSummaryComponent,
    InlineErrorsComponent,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DropmenuComponent,
    ProductOverviewComponent,
    CartComponent,
    CartProductComponent,
    ConfirmModalComponent,
    AmountComponent,
    OrderSummaryComponent,
    InlineErrorsComponent,
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [ConfirmDialogService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
