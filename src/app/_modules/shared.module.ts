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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
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
    CartComponent,
    CartProductComponent,
    ConfirmModalComponent,
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
