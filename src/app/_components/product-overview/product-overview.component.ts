import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@interfaces/productDto';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/localStorage.service';
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
    private localStorageService: LocalStorageService,
    private wishlistService: WishlistService
  ) {}

  goToProductDetails() {
    this.router.navigate([`products/${this.product.id}`]);
  }

  addToWishlist() {
    const currentList = this.wishlistService.getFullWishlist();
    this.wishlistService.updateWishList([...currentList, this.product]);
    this.product.isFavorite = true;
  }

  removeFromWishlist() {
    const currentList = this.wishlistService.getFullWishlist();
    const listWithoutProduct = currentList.filter(
      (wishProduct: Product) => wishProduct.id === this.product.id
    );
    this.wishlistService.updateWishList(listWithoutProduct);
    this.product.isFavorite = false;
  }

  ngOnInit() {
    this.wishlistService.manageProduct(this.product);
  }
}
