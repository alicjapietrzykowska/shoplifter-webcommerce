import { Product } from '@interfaces/productDto';
export interface Sorting {
  label: string;
  value: string;
  sortBy: keyof Product;
  order: SortingOrder;
}

export type SortingOrder = 'ASC' | 'DESC';
