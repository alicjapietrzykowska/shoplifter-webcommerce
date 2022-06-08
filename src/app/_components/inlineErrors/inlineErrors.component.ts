import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inline-errors',
  template: `
    <mat-error *ngIf="isError()">
      <div *ngFor="let error of getErrors()">
        {{ 'inlineErrors.' + error | translate }}
      </div>
    </mat-error>
  `,
  styles: [``],
})
export class InlineErrorsComponent {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  constructor() {}

  isError() {
    return this.form.get(this.controlName)?.invalid;
  }

  getErrors() {
    const formControl = this.form.get(this.controlName);
    if (!formControl?.dirty) return;
    if (!formControl?.errors) return [];
    return Object.keys(formControl.errors).map((key) =>
      formControl.errors ? key : ''
    );
  }
}
