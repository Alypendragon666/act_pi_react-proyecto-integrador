// app/products/edit/[id]/page.js
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useProduct } from '../../../hooks/useProduct';
import ProductForm from '../../../components/ProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <div>Cargando...</div>;
  if (error || !product) return <div>Producto no encontrado.</div>;

  return (
    <main>
      <h1 style={{ padding: 20 }}>Editar producto</h1>
      <ProductForm initialData={product} mode="edit" />
    </main>
  );
}
