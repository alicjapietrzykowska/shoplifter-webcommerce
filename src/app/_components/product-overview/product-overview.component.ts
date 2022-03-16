import { Component, Input } from '@angular/core';
import { Product } from '@interfaces/productDto';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent {
  @Input() product: Product | undefined;
  isHovered = false;

  constructor() {}
}
