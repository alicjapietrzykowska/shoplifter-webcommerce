import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
    message: ['', [Validators.required, Validators.maxLength(500)]],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}
}
