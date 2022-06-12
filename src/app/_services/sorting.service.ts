import { Injectable } from '@angular/core';
import { Sorting } from '@interfaces/sortingDto';
import { Product } from '@interfaces/productDto';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor() {}

  sortByNumbers(sorting: Sorting, products: Product[]) {
    const { sortBy, order } = sorting;
    if (order === 'ASC')
      return products.sort(
        (a: Product, b: Product) => Number(a[sortBy]) - Number(b[sortBy])
      );
    else
      return products.sort(
        (a: Product, b: Product) => Number(b[sortBy]) - Number(a[sortBy])
      );
  }

  sortByStrings(sorting: Sorting, products: Product[]) {
    const { sortBy, order } = sorting;
    if (order === 'ASC')
      return products.sort((a: Product, b: Product) =>
        String(a[sortBy]).localeCompare(String(b[sortBy]))
      );
    else
      return products.sort((a: Product, b: Product) =>
        String(b[sortBy]).localeCompare(String(a[sortBy]))
      );
  }

  sort(sorting: Sorting, products: Product[]): Product[] {
    if (typeof products[0][sorting.sortBy] === 'number') {
      return this.sortByNumbers(sorting, products);
    } else {
      return this.sortByStrings(sorting, products);
    }

    return products;
  }
}
