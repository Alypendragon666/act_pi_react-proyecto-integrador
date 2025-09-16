// app/products/[id]/page.js
'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useProduct } from '../../hooks/useProduct';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { product, loading, error } = useProduct(id);

  if (loading) return <div>Cargando...</div>;
  if (error || !product) return <div>Producto no encontrado.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.description}</p>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => router.push(`/products/edit/${product.id}`)}>Editar</button>
        <button onClick={async () => {
          if (!confirm('¿Eliminar este producto?')) return;
          try {
            const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error al eliminar');
            router.push('/products');
          } catch (err) {
            alert(err.message);
          }
        }}>Eliminar</button>
        <button onClick={() => router.push('/products')}>Volver al listado</button>
      </div>
    </div>
  );
}
