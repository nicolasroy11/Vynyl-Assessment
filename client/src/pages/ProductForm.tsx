import { useState } from "react";
import type { CreateProductInput } from "../lib/api";

type Props = {
  initial?: Partial<CreateProductInput>;
  submitLabel: string;
  onSubmit: (input: CreateProductInput) => Promise<void>;
};

export default function ProductForm({ initial, submitLabel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [stock, setStock] = useState<number>(initial?.stock ?? 0);
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [sku, setSku] = useState(initial?.sku ?? "");
  const [weight, setWeight] = useState<number>(initial?.weight ?? 0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSubmit({
        title,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
        brand,
        sku,
        weight: Number(weight),
      });
    } catch (err: any) {
      setError(err.message || "Save failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
        />
      </label>

      <label>
        Category
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>

      <label>
        Price
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          required
        />
      </label>

      <label>
        Stock
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          min={0}
          required
        />
      </label>

      <label>
        Brand
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </label>

      <label>
        SKU
        <input value={sku} onChange={(e) => setSku(e.target.value)} required />
      </label>

      <label>
        Weight
        <input
          type="number"
          step="0.01"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          min={0}
          required
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <button disabled={saving} type="submit">
          {saving ? "Saving…" : submitLabel}
        </button>
      </div>

      <style>{`
        label { display:block; margin-bottom: 10px; }
        input, textarea { width: 100%; padding: 6px; margin-top: 4px; }
      `}</style>
    </form>
  );
}
