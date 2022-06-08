import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shippingOptions } from 'assets/static/shipping.static';
import { LocalStorageService } from '@services/localStorage.service';
import { ShippingForm } from '@interfaces/shippingFormDto';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit {
  @Output() submit = new EventEmitter();
  @Output() saveShipping = new EventEmitter<number>();

  shippingOptions = shippingOptions;
  shippingForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.maxLength(50)]],
    company: ['', [Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    phone: ['', [Validators.required, Validators.maxLength(50)]],
    country: ['', [Validators.required, Validators.maxLength(50)]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.maxLength(50)]],
    zipCode: ['', [Validators.required, Validators.maxLength(50)]],
    shipping: ['', [Validators.required]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  saveForm(shippingForm: ShippingForm) {
    this.localStorageService.add('shipping', shippingForm);
    this.submit.emit();
  }

  manageShipping() {
    this.shippingForm.get('shipping')?.valueChanges.subscribe((res) => {
      this.saveShipping.emit(res);
    });
  }

  ngOnInit() {
    const localShippingAddress = this.localStorageService.get('shipping');
    if (localShippingAddress) {
      this.shippingForm.patchValue(localShippingAddress);
    }
    this.manageShipping();
  }
}
