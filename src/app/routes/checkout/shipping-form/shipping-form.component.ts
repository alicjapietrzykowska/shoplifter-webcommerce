import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent {
  shippingForm: FormGroup = this.formBuilder.group({
    fullName: [
      '',
      [Validators.required, Validators.maxLength(200), Validators.minLength(1)],
    ],
  });
  constructor(private formBuilder: FormBuilder) {}
}
