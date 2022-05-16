import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnChanges, OnDestroy {
  @Input() product!: Product;
  amount = this.product?.amount || 1;
  private removeSubscription$: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private dialogService: ConfirmDialogService,
    private translate: TranslateService
  ) {}

  removeProduct(event: MouseEvent) {
    event.stopPropagation();

    const confirmOptions: DialogOptions = {
      title: this.translate.instant('common.areYouSure'),
      message: this.translate.instant('products.confirmDeleteFromCart'),
    };
    this.dialogService.open(confirmOptions);

    this.removeSubscription$ = this.dialogService
      .confirmed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.cartService.removeFromCart(this.product);
        }
      });
  }

  updateAmount() {
    this.cartService.updateAmount(this.product, this.amount || 1);
  }

  manageAmount(event: MouseEvent, difference: number) {
    event.stopPropagation();
    //prevent negative product quantity
    if (this.amount === 0 && difference === -1) return;
    this.amount = this.amount + difference;
    this.updateAmount();
  }

  ngOnChanges() {
    this.amount = this.product.amount;
  }

  ngOnDestroy(): void {
    if (this.removeSubscription$) this.removeSubscription$.unsubscribe();
  }
}
