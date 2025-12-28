import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, Product } from "../lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);

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

  if (!Number.isFinite(productId)) {
    return (
      <div style={{ padding: 24 }}>
        <p>Invalid product id</p>
        <Link to="/">← Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to="/">← Back</Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!product && !error && <p>Loading…</p>}

      {product && (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <div style={{ marginTop: 12 }}>
            <div><b>Category:</b> {product.category}</div>
            <div><b>Brand:</b> {product.brand}</div>
            <div><b>SKU:</b> {product.sku}</div>
            <div><b>Price:</b> ${product.price}</div>
            <div><b>Stock:</b> {product.stock}</div>
            <div><b>Weight:</b> {product.weight}</div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Link to={`/products/${product.id}/edit`}>Edit</Link>
          </div>
        </>
      )}
    </div>
  );
}
