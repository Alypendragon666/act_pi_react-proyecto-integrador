// app/hooks/useProducts.js
'use client';
import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Error al obtener productos');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const createProduct = async (product) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error('Error creando producto');
    const newP = await res.json();
    setProducts(prev => [...prev, newP]);
    return newP;
  };

  const updateProduct = async (id, updates) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Error actualizando producto');
    const updated = await res.json();
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    return updated;
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error eliminando producto');
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct };
}
