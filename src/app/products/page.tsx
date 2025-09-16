'use client';
import { useEffect, useState } from 'react';
import { getProducts } from '../../lib/api';
import { Product } from '../../types';

import ProductCard from '../../components/features/ProductCard';



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}