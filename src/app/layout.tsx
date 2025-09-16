import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tienda Virtual - Proyecto Integrador',
  description: 'Aplicación con Next.js + MockAPI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}