// app/api/products/route.js
import { NextResponse } from 'next/server';

/**
 * Datos en memoria (seed) — solo para demo.
 */
let PRODUCTS = [
  { id: '1', name: 'Intel Core i9-13900K', category: 'CPU', price: 599.99, stock: 12,
    description: 'Procesador de alto rendimiento para desktop.' },
  { id: '2', name: 'NVIDIA RTX 4080', category: 'GPU', price: 1199.00, stock: 5,
    description: 'Tarjeta gráfica para gaming y creación.' },
  { id: '3', name: 'Corsair Vengeance 32GB (2x16GB) DDR5', category: 'RAM', price: 179.99, stock: 20,
    description: 'Memoria RAM DDR5 para plataformas modernas.' },
  { id: '4', name: 'Samsung 980 Pro 1TB', category: 'SSD', price: 129.99, stock: 15,
    description: 'SSD NVMe de alto rendimiento.' },
  { id: '5', name: 'ASUS ROG Strix Z790', category: 'Motherboard', price: 349.99, stock: 7,
    description: 'Placa base gaming con muchas conexiones.' },
  { id: '6', name: 'Corsair RM850x', category: 'PSU', price: 139.99, stock: 9,
    description: 'Fuente de poder 850W, certificación Gold.' },
  { id: '7', name: 'NZXT H510 Elite', category: 'Case', price: 149.99, stock: 6,
    description: 'Gabinete ATX con excelente flujo de aire.' }
];

let nextId = PRODUCTS.length + 1;

export async function GET() {
  return NextResponse.json(PRODUCTS);
}

export async function POST(request) {
  const body = await request.json();
  const newProduct = {
    id: String(nextId++),
    name: body.name || 'Nuevo producto',
    category: body.category || 'Otros',
    price: typeof body.price === 'number' ? body.price : parseFloat(body.price || 0),
    stock: typeof body.stock === 'number' ? body.stock : parseInt(body.stock || 0, 10),
    description: body.description || ''
  };
  PRODUCTS.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
