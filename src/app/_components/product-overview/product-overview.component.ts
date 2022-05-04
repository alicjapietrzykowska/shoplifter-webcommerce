import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  @Input() product!: Product;
  isHovered = false;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  goToProductDetails() {
    this.router.navigate([`products/${this.product.id}`]);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.product.isInCart = true;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    this.product.isInCart = false;
  }

  addToWishlist() {
    this.wishlistService.addToWishList(this.product);
    this.product.isFavorite = true;
  }

  removeFromWishlist() {
    this.wishlistService.removeFromWishList(this.product);
    this.product.isFavorite = false;
  }

  ngOnInit() {
    this.wishlistService.manageProduct(this.product);
    this.cartService.manageProduct(this.product);
  }
}
