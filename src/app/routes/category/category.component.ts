import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { take } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private translate: TranslateService
  ) {
    this.categoryName = this.activatedRoute.snapshot.queryParams['category'];
  }

  getProductsInCategory() {
    this.productService
      .getProductsInCategory(this.categoryName)
      .pipe(take(1))
      .subscribe((res: Product[]) => {
        this.products = res;
      });
  }

  ngOnInit() {
    //TODO: remove 'Sale & Offers'
    if (
      !this.categoryName ||
      this.categoryName === this.translate.instant('general.saleOffers') ||
      this.categoryName === 'Sale & Offers'
    ) {
      this.products = [...this.productService.allProducts];
    } else {
      this.getProductsInCategory();
    }
  }
}
