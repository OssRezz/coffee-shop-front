import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { SkeletonCards } from "../ProductCard/SkeletonCards";
import { Product } from "../../interfaces/product";
import { getProducts } from "../../controllers/get-products.controller";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts();
        setProducts(result);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="row d-flex justify-content-center g-5">
      {loading ? (
        <SkeletonCards count={24} />
      ) : (
        products.map((product) => (
          <div className="col-auto d-flex justify-content-center" key={`product-${product.id}`}>
            <ProductCard product={product} />
          </div>
        ))
      )}
    </section>
  );
};

export default ProductList;
