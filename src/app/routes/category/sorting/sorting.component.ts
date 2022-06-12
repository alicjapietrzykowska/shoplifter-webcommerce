import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sorting } from '@interfaces/sortingDto';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit, OnDestroy {
  @Output() sort = new EventEmitter<Sorting>();

  sortingControl = new FormControl();
  chosenSorting!: Sorting | undefined;
  sortingOptions: Sorting[] = [
    {
      value: 'titleASC',
      sortBy: 'title',
      order: 'ASC',
      label: this.translate.instant('sorting.name'),
    },
    {
      value: 'titleDESC',
      order: 'DESC',
      sortBy: 'title',
      label: this.translate.instant('sorting.name'),
    },
    {
      value: 'priceASC',
      sortBy: 'price',
      order: 'ASC',
      label: this.translate.instant('sorting.price'),
    },
    {
      value: 'priceDESC',
      sortBy: 'price',
      order: 'DESC',
      label: this.translate.instant('sorting.price'),
    },
  ];

  private sortingSubscription$: Subscription | undefined;

  constructor(private translate: TranslateService) {}

  manageSorting(value: string) {
    this.chosenSorting = this.sortingOptions.find(
      (option) => option.value === value
    );
    this.sort.emit(this.chosenSorting);
  }

  ngOnInit(): void {
    this.sortingSubscription$ = this.sortingControl.valueChanges.subscribe(
      (res) => {
        this.manageSorting(res);
      }
    );
  }

  ngOnDestroy() {
    if (this.sortingSubscription$) this.sortingSubscription$.unsubscribe();
  }
}
