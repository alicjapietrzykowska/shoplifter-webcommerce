import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { adsData } from 'assets/static/ads.static';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  allAds = adsData;
  private productsSubscription$: Subscription | undefined;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  redirect(category: string) {
    this.router.navigate([`product-list`], {
      queryParams: { category },
    });
  }

  ngOnInit(): void {
    //randomize products to get different categories products side by side
    this.productsSubscription$ = this.productService.allProducts$.subscribe(
      (products) => {
        this.allProducts = [...products].sort(() => 0.5 - Math.random());
      }
    );
  }

  ngOnDestroy(): void {
    if (this.productsSubscription$) this.productsSubscription$.unsubscribe();
  }
}
