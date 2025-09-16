// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  return NextResponse.json(p);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const idx = PRODUCTS.findIndex(x => x.id === id);
  if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  const updated = {
    ...PRODUCTS[idx],
    name: body.name ?? PRODUCTS[idx].name,
    category: body.category ?? PRODUCTS[idx].category,
    price: typeof body.price === 'number' ? body.price : parseFloat(body.price ?? PRODUCTS[idx].price),
    stock: typeof body.stock === 'number' ? body.stock : parseInt(body.stock ?? PRODUCTS[idx].stock, 10),
    description: body.description ?? PRODUCTS[idx].description
  };
  PRODUCTS[idx] = updated;
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const idx = PRODUCTS.findIndex(x => x.id === id);
  if (idx === -1) return NextResponse.json({ error: 'No encontrado' }, { status: 404 });
  PRODUCTS.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
