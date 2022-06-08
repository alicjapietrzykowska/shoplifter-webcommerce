import { AfterContentChecked, Component } from '@angular/core';
import { LocalStorageService } from '@services/localStorage.service';
import { shippingOptions } from 'assets/static/shipping.static';
import { Shipping } from '@interfaces/shippingDto';
import { ShippingForm } from '@interfaces/shippingFormDto';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements AfterContentChecked {
  address!: ShippingForm | undefined;
  shippingType!: Shipping | undefined;
  constructor(private localStorageService: LocalStorageService) {}

  ngAfterContentChecked(): void {
    this.address = this.localStorageService.get('shipping');
    if (this.address) {
      this.shippingType = shippingOptions.find(
        (option) => option.price === this.address?.shipping
      );
    }
  }
}
