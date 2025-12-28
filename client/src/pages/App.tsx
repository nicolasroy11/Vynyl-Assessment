import { useEffect, useState } from "react";
import {
  listProducts,
  deleteProduct,
  Product,
  searchProducts,
} from "../lib/api";
import { Link } from "react-router-dom";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"id" | "price" | "stock">("id");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await listProducts({ sort, order });
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  async function onSearch() {
    try {
      setLoading(true);
      setError(null);
      const data = await searchProducts(query);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Search failed!");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  }

  useEffect(() => {
    load();
  }, [sort, order]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search title or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => onSearch()} style={{ marginLeft: 8 }}>
          Search
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>
          Sort by{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="id">ID</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </label>

        <label style={{ marginLeft: 8 }}>
          Order{" "}
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as any)}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </label>

        <Link to="/new" style={{ marginLeft: 16 }}>
          + New Product
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border={1} cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Link to={`/products/${p.id}`}>{p.title}</Link>
              </td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Link to={`/products/${p.id}/edit`}>Edit</Link>{" "}
                <button onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {!loading && products.length === 0 && (
            <tr>
              <td colSpan={5}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
