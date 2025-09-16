// app/hooks/useProduct.js
'use client';
import { useState, useEffect } from 'react';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error('No encontrado');
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  return { product, loading, error, reload: fetchProduct };
}
