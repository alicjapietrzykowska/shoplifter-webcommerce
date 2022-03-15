import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { MenuItem } from '@interfaces/menuItemsDto';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.scss'],
})
export class DropmenuComponent implements OnInit, OnChanges {
  @Input() activeMenuItem: MenuItem | undefined;
  productList: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  getProductsFromCategory() {
    if (!this.activeMenuItem) return;
    this.productsService
      .getProductsInCategory(this.activeMenuItem.title)
      .subscribe((res) => {
        this.productList = res;
      });
  }

  goToProductDetails(product: Product) {
    this.router.navigate([`products/${product.id}`]);
  }

  ngOnInit() {
    this.getProductsFromCategory();
  }

  ngOnChanges() {
    this.getProductsFromCategory();
  }
}
