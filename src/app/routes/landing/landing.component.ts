import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { ProductsService } from '@services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(
    private productService: ProductsService,
    private translate: TranslateService,
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
