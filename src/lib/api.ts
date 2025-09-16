import { Product } from "@/types";

const API_BASE = "https://your-api-base-url.com"; // Replace with your actual API base URL

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  const data = await res.json();
  console.log(data); // <<-- agrega esto para depurar
  return data;
}