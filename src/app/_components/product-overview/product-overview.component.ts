import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';
import { CartService } from '@services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  isHovered = false;
  private removeSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private translate: TranslateService,
    private dialogService: ConfirmDialogService
  ) {}

  goToProductDetails() {
    this.router.navigate([`products/${this.product.id}`]);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.product.isInCart = true;
  }

  removeFromCart() {
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
          this.product.isInCart = false;
        }
      });
  }

  addToWishlist() {
    this.wishlistService.addToWishList(this.product);
    this.product.isFavorite = true;
  }

  removeFromWishlist() {
    this.wishlistService.removeFromWishList(this.product);
    this.product.isFavorite = false;
  }

  ngOnInit() {
    this.wishlistService.manageProduct(this.product);
    this.cartService.manageProduct(this.product);
  }

  ngOnDestroy(): void {
    if (this.removeSubscription$) this.removeSubscription$.unsubscribe();
  }
}
