import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartLength = 0;
  cartTotal = 0;

  showCart = false;
  private cartSubscription$: Subscription | undefined;

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    //prevent from hiding the cart when confirm dialog visible
    if (document.querySelector('app-confirm-dialog')) {
      return;
    }
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showCart = false;
    }
  }

  constructor(
    private router: Router,
    private cartService: CartService,
    private eRef: ElementRef
  ) {}

  goToWishList() {
    this.router.navigate([`product-list`], {
      queryParams: { category: 'wishlist' },
    });
  }

  calculateItemsAmount(cart: Product[]) {
    return cart.reduce((n, product) => n + product.amount, 0);
  }

  manageCart() {
    this.cartLength = this.calculateItemsAmount(this.cartService.cart);
    this.cartTotal = this.cartService.cartTotal;
    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartLength = this.calculateItemsAmount(cart);
      this.cartTotal = this.cartService.cartTotal;
    });
  }

  ngOnInit() {
    this.manageCart();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription$) this.cartSubscription$.unsubscribe();
  }
}
