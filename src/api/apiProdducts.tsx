const API_URL = "https://68c8f75dceef5a150f62ed2b.mockapi.io/api/v1/Products";

export interface Product {
  link: string;
  Marca: string;
  Modelo: string;
  Especificaciones: string;
  Precio: number;
  Id: string;
}