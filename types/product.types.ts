export interface Color {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  price: number;
  images: string[];
  sizes: string[];
  colors: Color[];
  metadata: Array<{ label: string; value: string }>;
}
