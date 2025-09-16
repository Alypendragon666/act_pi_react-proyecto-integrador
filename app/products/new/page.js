// app/products/new/page.js
import ProductForm from '../../components/ProductForm';

export default function NewProductPage() {
  return (
    <main>
      <h1 style={{ padding: 20 }}>Crear producto</h1>
      <ProductForm mode="create" />
    </main>
  );
}
