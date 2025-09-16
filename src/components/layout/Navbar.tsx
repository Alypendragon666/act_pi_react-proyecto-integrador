import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold">Tienda Virtual</h1>
      <div className="flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/about">Acerca</Link>
        <Link href="/products">Productos</Link>
      </div>
    </nav>
  );
}