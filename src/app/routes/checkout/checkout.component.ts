import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutTab } from '@interfaces/checkoutTabDto';
import { Location } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  tabs: CheckoutTab[] = [
    {
      active: true,
      finished: false,
      route: 'shipping',
      title: this.translate.instant('checkout.shippingInfo'),
      id: 0,
    },
    {
      active: false,
      finished: false,
      route: 'payment',
      title: this.translate.instant('checkout.paymentMethod'),
      id: 1,
    },
    {
      active: false,
      finished: false,
      route: 'review',
      title: this.translate.instant('checkout.orderReview'),
      id: 2,
    },
  ];
  activeTab = this.tabs.findIndex((tab) => tab.id === 0);
  shippingPrice!: number;

  constructor(
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    const routeTab = this.activatedRoute.snapshot.params['tab'];
    if (!routeTab) this.location.go(`/checkout/${this.tabs[0].route}`);
    this.activeTab = this.tabs.findIndex((tab) => tab.route === routeTab);
  }

  saveShipping(shippingPrice: number) {
    this.shippingPrice = shippingPrice;
  }

  changeTab(tab: CheckoutTab) {
    tab.finished = true;
    this.activeTab = tab.id + 1;
    const newTab = this.tabs.find((newTab) => newTab.id === this.activeTab);
    if (newTab) this.location.go(`/checkout/${newTab.route}`);
    window.scroll(0, 0);
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
