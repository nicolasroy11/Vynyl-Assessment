const API_BASE_URL = "http://localhost:3000/api";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductInput = {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
};

export type UpdateProductInput = Partial<CreateProductInput>;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }

  return res.json();
}

/* ---------- Products ---------- */

export function listProducts(params?: {
  limit?: number;
  offset?: number;
  sort?: string;
  order?: "asc" | "desc";
}) {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.offset) qs.set("offset", String(params.offset));
  if (params?.sort) qs.set("sortField", params.sort);
  if (params?.order) qs.set("sortOrder", params.order);

  const query = qs.toString();
  return request<Product[]>(`/products${query ? `?${query}` : ""}`);
}

export function searchProducts(query: string) {
  const qs = new URLSearchParams();
  qs.set("q", query);
  return request<Product[]>(`/products/search?${qs.toString()}`);
}

export function getProduct(id: number) {
  return request<Product>(`/products/${id}`);
}

export function createProduct(input: CreateProductInput) {
  return request<Product>(`/products`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: number, input: UpdateProductInput) {
  return request<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number) {
  return request<{ deleted: boolean; id: number }>(
    `/products/${id}`,
    { method: "DELETE" }
  );
}
