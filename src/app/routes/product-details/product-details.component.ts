import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  template: `product details works {{ product?.title }}`,
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}

  getProductDetails() {
    console.log('all products', this.productService.allProducts);
    const productId = this.activatedRoute.snapshot.params['id'];
    if (!productId) return;
    this.productService
      .getProductDetails(productId)
      .pipe(take(1))
      .subscribe((res: Product) => {
        this.product = res;
      });
  }

  ngOnInit() {
    this.getProductDetails();
  }
}
