export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`);
  const data = await res.json();
  console.log(data); // <<-- agrega esto para depurar
  return data;
}