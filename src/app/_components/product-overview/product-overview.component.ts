import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';

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
    private wishlistService: WishlistService
  ) {}

  goToProductDetails() {
    this.router.navigate([`products/${this.product.id}`]);
  }

  addToWishlist() {
    const currentList = this.wishlistService.wishlist;
    this.wishlistService.wishlist = [...currentList, this.product];
    this.product.isFavorite = true;
  }

  removeFromWishlist() {
    const currentList = this.wishlistService.wishlist;
    const listWithoutProduct = currentList.filter(
      (wishProduct: Product) => wishProduct.id !== this.product.id
    );
    this.wishlistService.wishlist = listWithoutProduct;
    this.product.isFavorite = false;
  }

  ngOnInit() {
    this.wishlistService.manageProduct(this.product);
  }
}
