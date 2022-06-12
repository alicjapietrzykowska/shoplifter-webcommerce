import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { take, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { WishlistService } from '@services/wishlist.service';
import { Sorting } from '@interfaces/sortingDto';
import { SortingService } from '@services/sorting.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categoryName: string;
  private wishlistSubscription$: Subscription | undefined;
  private productsSubscription$: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private wishlistService: WishlistService,
    private translate: TranslateService,
    private sortingService: SortingService
  ) {
    this.categoryName = this.activatedRoute.snapshot.queryParams['category'];
  }

  sort(sorting: Sorting) {
    this.products = this.sortingService.sort(sorting, this.products);
  }

  getProductsInCategory() {
    this.productService
      .getProductsInCategory(this.categoryName)
      .pipe(take(1))
      .subscribe((res: Product[]) => {
        this.products = res;
      });
  }

  manageWishList() {
    this.products = [...this.wishlistService.wishlist];
    this.wishlistSubscription$ = this.wishlistService.wishlist$.subscribe(
      (wishlist) => {
        this.products = [...wishlist];
      }
    );
  }

  manageAllProducts() {
    this.products = [...this.productService.allProducts];
    this.productsSubscription$ = this.productService.allProducts$.subscribe(
      (res) => {
        this.products = res;
      }
    );
  }

  ngOnInit() {
    //TODO: remove 'Sale & Offers'
    if (
      !this.categoryName ||
      this.categoryName === this.translate.instant('general.saleOffers') ||
      this.categoryName === 'Sale & Offers'
    ) {
      this.manageAllProducts();
    } else if (this.categoryName === 'wishlist') {
      this.manageWishList();
    } else {
      this.getProductsInCategory();
    }
  }

  ngOnDestroy() {
    if (this.wishlistSubscription$) this.wishlistSubscription$.unsubscribe();
    if (this.productsSubscription$) this.productsSubscription$.unsubscribe();
  }
}
