import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shippingOptions } from 'assets/static/shipping.static';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent {
  @Output() submit = new EventEmitter();

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
  constructor(private formBuilder: FormBuilder) {}

  saveForm() {
    this.submit.emit();
  }
}
