export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
  isFavorite?: boolean;
}

interface Rating {
  rate: number;
  count: number;
}
