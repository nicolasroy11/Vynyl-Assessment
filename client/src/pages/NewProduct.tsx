import { useNavigate, Link } from "react-router-dom";
import ProductForm from "../pages/ProductForm";
import { createProduct, CreateProductInput } from "../lib/api";

export default function ProductNew() {
  const navigate = useNavigate();

  async function handleCreate(input: CreateProductInput) {
    const product = await createProduct(input);
    navigate(`/products/${product.id}`);
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to="/">Back</Link>
      <h1>New Product</h1>

      <ProductForm submitLabel="Create Product" onSubmit={handleCreate} />
    </div>
  );
}
