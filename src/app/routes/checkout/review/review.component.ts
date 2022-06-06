import { Component } from '@angular/core';
import { LocalStorageService } from '@services/localStorage.service';
import { shippingOptions } from 'assets/static/shipping.static';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  address: any = {};
  shippingType: any = {};
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.address = this.localStorageService.get('shipping');
    if (this.address) {
      this.shippingType = shippingOptions.find(
        (option) => option.price === this.address.shipping
      );
    }
  }
}
