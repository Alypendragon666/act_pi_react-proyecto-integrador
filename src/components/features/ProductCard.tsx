import { Product } from '../../types';
import Link from 'next/link';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="font-semibold mb-2">${product.price}</p>
      <p className="italic mb-2">Categoría: {product.category}</p>
      <Link
        href={`/products/${product.id}`}
        className="text-blue-500 hover:underline"
      >
        Ver detalles
      </Link>
    </div>
  );
}