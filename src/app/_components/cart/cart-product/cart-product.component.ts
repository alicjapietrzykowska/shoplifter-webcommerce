import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnChanges {
  @Input() product!: Product;
  amount = this.product?.amount || 1;

  constructor(private cartService: CartService) {}

  removeProduct(event: MouseEvent) {
    event.stopPropagation();
    this.cartService.removeFromCart(this.product);
  }

  updateAmount() {
    this.cartService.updateAmount(this.product, this.amount);
  }

  ngOnChanges() {
    this.amount = this.product.amount;
  }
}
