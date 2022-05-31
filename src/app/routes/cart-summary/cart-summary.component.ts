import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '@interfaces/productDto';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  cartLength = 0;
  cartTotal = 0;
  cart: Product[] = [];

  rows: Product[] = [];
  columns = [
    { prop: 'title', name: this.translate.instant('cart.product') },
    { prop: 'category', name: this.translate.instant('cart.category') },
    { prop: 'price', name: this.translate.instant('cart.price') },
    { prop: 'amount', name: this.translate.instant('cart.amount') },
    { prop: 'close' },
  ];

  private cartSubscription$: Subscription | undefined;
  private removeSubscription$: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private translate: TranslateService,
    private dialogService: ConfirmDialogService,
    private router: Router
  ) {}

  removeProduct(product: Product) {
    const confirmOptions: DialogOptions = {
      title: this.translate.instant('common.areYouSure'),
      message: this.translate.instant('products.confirmDeleteFromCart'),
    };
    this.dialogService.open(confirmOptions);

    this.removeSubscription$ = this.dialogService
      .confirmed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.cartService.removeFromCart(product);
        }
      });
  }

  goToProductDetails(product: Product) {
    this.router.navigate([`products/${product.id}`]);
  }

  manageCart() {
    this.cartTotal = this.cartService.cartTotal;
    this.cart = this.cartService.cart;
    this.rows = this.cart;
    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartTotal = this.cartService.cartTotal;
      this.cart = cart;
      this.rows = this.cart;
    });
  }

  ngOnInit() {
    this.manageCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
    if (this.removeSubscription$) this.removeSubscription$.unsubscribe();
  }
}
