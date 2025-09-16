import { useEffect, useState } from "react";
import { Product } from "@/types"; // Importa tu interfaz Product

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://68c8f75dceef5a150f62ed2b.mockapi.io/api/v1/Products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};