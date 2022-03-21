import { Component, Input } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  @Input() product: Product | undefined;
  isHovered = false;

  constructor(private router: Router) {}

  goToProductDetails() {
    if (!this.product) return;
    this.router.navigate([`products/${this.product.id}`]);
  }
}
