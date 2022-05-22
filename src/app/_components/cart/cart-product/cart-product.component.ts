import { Component, OnDestroy, Input } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnDestroy {
  @Input() product!: Product;
  private removeSubscription$: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private dialogService: ConfirmDialogService,
    private translate: TranslateService,
    private router: Router
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

  goToProductDetails() {
    this.router.navigate([`products/${this.product.id}`]);
  }

  ngOnDestroy(): void {
    if (this.removeSubscription$) this.removeSubscription$.unsubscribe();
  }
}
