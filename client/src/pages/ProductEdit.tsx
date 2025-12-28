import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../pages/ProductForm";
import { getProduct, updateProduct, Product } from "../lib/api";

export default function ProductEdit() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        const p = await getProduct(productId);
        setProduct(p);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      }
    }
    if (Number.isFinite(productId)) load();
  }, [productId]);

  async function handleUpdate(input: any) {
    await updateProduct(productId, input);
    navigate(`/products/${productId}`);
  }

  if (!Number.isFinite(productId)) {
    return (
      <div style={{ padding: 24 }}>
        <p>Invalid product id</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to={`/products/${productId}`}>Back</Link>
      <h1>Edit Product</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!product && !error && <p>Loading…</p>}

      {product && (
        <ProductForm
          submitLabel="Save Changes"
          initial={{
            title: product.title,
            description: product.description,
            category: product.category,
            price: Number(product.price),
            stock: product.stock,
            brand: product.brand,
            sku: product.sku,
            weight: product.weight,
          }}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
