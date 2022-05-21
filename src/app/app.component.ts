import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
    <app-layout></app-layout>
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
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.productService.getProducts(20);
    this.isLoadingSubscription$ = this.loaderService.loader$.subscribe(
      (res) => {
        this.isAppLoading = res;
        this.cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription$) this.isLoadingSubscription$.unsubscribe();
  }
}
