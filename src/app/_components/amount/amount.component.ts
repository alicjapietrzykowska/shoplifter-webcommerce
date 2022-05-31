import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { CartService } from '@services/cart.service';
import { Product } from '@interfaces/productDto';
@Component({
  selector: 'app-amount',
  template: `
    <form class="amount">
      <button
        [disabled]="amount === 1"
        type="button"
        (click)="manageAmount($event, -1)"
      >
        -
      </button>
      <input
        type="number"
        min="1"
        [(ngModel)]="amount"
        (ngModelChange)="updateAmount()"
        [ngModelOptions]="{ standalone: true }"
      />
      <button type="button" (click)="manageAmount($event, 1)">+</button>
    </form>
  `,
  styleUrls: ['./amount.component.scss'],
})
export class AmountComponent implements OnChanges {
  @Input() product!: Product;
  @Output() update = new EventEmitter<number>();
  amount = this.product?.amount || 1;

  constructor(private cartService: CartService) {}

  updateAmount() {
    this.cartService.updateAmount(this.product, this.amount || 1);
  }

  manageAmount(event: MouseEvent, difference: number) {
    event.stopPropagation();
    //prevent negative product quantity
    if (this.amount === 0 && difference === -1) return;
    this.amount = this.amount + difference;
    this.updateAmount();
  }

  ngOnChanges() {
    this.amount = this.product.amount;
  }
}
