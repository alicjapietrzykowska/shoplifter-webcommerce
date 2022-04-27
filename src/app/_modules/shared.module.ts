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
    MenuComponent,
    TranslateModule,
    ProductOverviewComponent,
    AngularMaterialModule,
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    DropmenuComponent,
    ProductOverviewComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
