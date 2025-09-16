// app/components/ProductList.jsx
'use client';
import Link from 'next/link';
import React from 'react';
import { useProducts } from '../hooks/useProducts';

export default function ProductList() {
  const { products, loading, error, deleteProduct } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Productos (Partes de computadora / tecnología)</h1>
        <Link href="/products/new"><button>Crear</button></Link>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {products.map(p => (
          <li key={p.id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10, borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{p.name}</strong> <small>({p.category})</small>
                <div style={{ marginTop: 6 }}>{p.description}</div>
                <div style={{ marginTop: 6 }}>Precio: ${p.price} · Stock: {p.stock}</div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Link href={`/products/${p.id}`}><button>Ver</button></Link>
                <Link href={`/products/edit/${p.id}`}><button>Editar</button></Link>
                <button
                  onClick={async () => {
                    if (!confirm(`¿Eliminar ${p.name}?`)) return;
                    try {
                      await deleteProduct(p.id);
                      alert('Eliminado');
                    } catch (err) {
                      alert('Error al eliminar: ' + err.message);
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
