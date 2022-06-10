import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@interfaces/productDto';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './products-carousel.component.html',
})
export class ProductCarouselComponent {
  @Input() products!: Product[];
  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
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
  constructor() {}
}
