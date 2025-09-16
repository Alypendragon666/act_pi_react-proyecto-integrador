import { getProducts } from '../../../lib/api';
import { Product } from '../../../types';

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const products: Product[] = await getProducts();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="font-semibold">${product.price}</p>
      <p className="italic">Categoría: {product.category}</p>
    </section>
  );
}