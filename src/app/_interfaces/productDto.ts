export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  amount: number;
  rating: Rating;
  title: string;
  isInCart?: boolean;
  isFavorite?: boolean;
}

interface Rating {
  rate: number;
  count: number;
}
