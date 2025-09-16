export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}