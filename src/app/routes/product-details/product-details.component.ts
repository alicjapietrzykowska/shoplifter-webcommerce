import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { take, Subscription } from 'rxjs';
import { CartService } from '@services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@services/confirm-dialog.service';
import { DialogOptions } from '@interfaces/dialogOptionsDto';
import { WishlistService } from '@services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  similarProducts!: Product[];
  private removeSubscription$: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private translate: TranslateService,
    private dialogService: ConfirmDialogService,
    private wishlistService: WishlistService
  ) {}

  getProductsInCategory() {
    function getFourSimilarProducts(arr: Product[]) {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());

      return shuffled.slice(0, 4);
    }

    const productsWithCategory = this.productService.allProducts.filter(
      (product) =>
        product.category === this.product.category &&
        product.id !== this.product.id
    );
    this.similarProducts = getFourSimilarProducts(productsWithCategory);
  }

  getProductDetails() {
    const productId = this.activatedRoute.snapshot.params['id'];
    if (!productId) return;
    this.productService
      .getProductDetails(productId)
      .pipe(take(1))
      .subscribe((res: Product) => {
        this.product = res;
        this.wishlistService.manageProduct(this.product);
        this.cartService.manageProduct(this.product);
        this.getProductsInCategory();
      });
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
    this.getProductDetails();
  }

  ngOnDestroy(): void {
    if (this.removeSubscription$) this.removeSubscription$.unsubscribe();
  }
}
