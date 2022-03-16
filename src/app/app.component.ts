import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@services/products.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="loader-wrapper" *ngIf="isAppLoading">
      <mat-progress-spinner
        color="primary"
        mode="indeterminate"
      ></mat-progress-spinner>
    </div>
    <app-layout *ngIf="!isAppLoading"></app-layout>
  `,
  styles: [
    `
      .loader-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  isAppLoading: boolean = true;
  private isLoadingSubscription$: Subscription | undefined;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private loaderService: LoaderService
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.isLoadingSubscription$ = this.loaderService.loader$.subscribe(
      (res) => {
        this.isAppLoading = res;
      }
    );
  }

  ngOnInit() {
    this.productService.getProducts(20);
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription$) this.isLoadingSubscription$.unsubscribe();
  }
}
