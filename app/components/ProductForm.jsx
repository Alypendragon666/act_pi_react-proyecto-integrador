// app/components/ProductForm.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm({ initialData = null, mode = 'create' }) {
  const [form, setForm] = useState({
    id: initialData?.id ?? '',
    name: initialData?.name ?? '',
    category: initialData?.category ?? '',
    price: initialData?.price ?? '',
    stock: initialData?.stock ?? '',
    description: initialData?.description ?? ''
  });
  const router = useRouter();

  useEffect(() => {
    if (initialData) setForm({
      id: initialData.id,
      name: initialData.name ?? '',
      category: initialData.category ?? '',
      price: initialData.price ?? '',
      stock: initialData.stock ?? '',
      description: initialData.description ?? ''
    });
  }, [initialData]);

  const handleChange = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            category: form.category,
            price: parseFloat(form.price || 0),
            stock: parseInt(form.stock || 0, 10),
            description: form.description
          })
        });
        if (!res.ok) throw new Error('Error creando');
        const created = await res.json();
        router.push(`/products/${created.id}`);
      } else {
        const res = await fetch(`/api/products/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            category: form.category,
            price: parseFloat(form.price || 0),
            stock: parseInt(form.stock || 0, 10),
            description: form.description
          })
        });
        if (!res.ok) throw new Error('Error actualizando');
        const updated = await res.json();
        router.push(`/products/${updated.id}`);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 600 }}>
      <div style={{ marginBottom: 8 }}>
        <label>Nombre<br />
          <input value={form.name} onChange={handleChange('name')} required />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Categoría<br />
          <input value={form.category} onChange={handleChange('category')} required />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Precio<br />
          <input type="number" step="0.01" value={form.price} onChange={handleChange('price')} required />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Stock<br />
          <input type="number" value={form.stock} onChange={handleChange('stock')} required />
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Descripción<br />
          <textarea value={form.description} onChange={handleChange('description')} />
        </label>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">{mode === 'create' ? 'Crear' : 'Guardar'}</button>
        <button type="button" onClick={() => history.back()}>Cancelar</button>
      </div>
    </form>
  );
}
