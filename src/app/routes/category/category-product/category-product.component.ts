import { Component, Input } from '@angular/core';
import { Product } from '@interfaces/productDto';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.scss'],
})
export class CategoryProductComponent {
  @Input() product: Product | undefined;
  isHovered = false;

  constructor() {}
}
