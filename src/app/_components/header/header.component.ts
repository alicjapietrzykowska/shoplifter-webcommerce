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

  manageCart() {
    this.cartLength = this.cartService.cart.length;
    this.cartTotal = this.cartService.cartTotal;
    this.cartSubscription$ = this.cartService.cart$.subscribe((cart) => {
      this.cartLength = cart.length;
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
