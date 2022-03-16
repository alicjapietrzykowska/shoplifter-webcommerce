import { Component, Input, OnChanges } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { MenuItem } from '@interfaces/menuItemsDto';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.scss'],
})
export class DropmenuComponent implements OnChanges {
  @Input() activeMenuItem: MenuItem | undefined;
  productList: Product[] = [];
  randomProducts: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  getProductsFromCategory() {
    if (!this.activeMenuItem) return;
    this.productList = this.productsService.allProducts.filter(
      (product) => product.category === this.activeMenuItem?.title
    );
    this.randomProducts = this.getRandomProducts();
  }

  goToProductDetails(product: Product) {
    this.router.navigate([`products/${product.id}`]);
  }

  getRandomProducts() {
    const NUMBER_OF_PRODUCTS = 3;
    const shuffled = [...this.productList].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, NUMBER_OF_PRODUCTS);
  }

  ngOnChanges() {
    this.getProductsFromCategory();
  }
}
