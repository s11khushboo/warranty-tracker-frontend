// src/pages/Dashboard.tsx
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import type { Product, ProductStatus } from "../types/product";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import StatsBar from "../components/StatsBar";
import ProductCard from "../components/ProductCard";
import DeleteConfirm from "../components/DeleteConfirm";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  const [status, setStatus] = useState<ProductStatus | "">("");
  const [sortBy, setSortBy] = useState("warrantyEndDate");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
const [deleteLoading, setDeleteLoading] = useState(false);


  const fetchProducts = async () => {
    setError("");

    try {
      setLoading(true);

      const params: any = { sortBy, direction };
      if (status) params.status = status;

      const res = await api.get("/products", { params });
      setProducts(res.data);
    } catch {
      setError("Failed to load products. Check backend + login token.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sortBy, direction]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q)
      );
    });
  }, [products, search]);

  return (
    <div className="relative min-h-screen bg-[#EEF2FF] text-gray-900">
      {/* Background glow */}
   <div className="absolute inset-0 -z-10 overflow-hidden">
  <div className="absolute -top-56 left-1/2 h-[650px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200 via-sky-200 to-purple-200 blur-[90px] opacity-90" />
  <div className="absolute top-36 left-[-80px] h-[420px] w-[420px] rounded-full bg-gradient-to-r from-emerald-200 to-lime-200 blur-[90px] opacity-60" />
  <div className="absolute top-44 right-[-80px] h-[420px] w-[420px] rounded-full bg-gradient-to-r from-pink-200 to-rose-200 blur-[90px] opacity-55" />
</div>

   <div className="max-w-[1400px] mx-auto px-2 py-5">
        {/* Glass container */}
        <div className="rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/60
shadow-[0_35px_120px_rgba(56,189,248,0.25),0_20px_60px_rgba(0,0,0,0.08)]
overflow-hidden">
          <Navbar />

          <div className="p-5">
            {/* Stats */}
            <StatsBar products={products} />

            {/* Controls */}
            <div className="mt-6 bg-white/70 backdrop-blur-xl rounded-3xl
shadow-[0_14px_40px_rgba(0,0,0,0.08)]
border border-white/60 p-4">
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                    <input
                      className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-black/80"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                  <select
                    className="px-4 py-2 rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="EXPIRING_SOON">Expiring Soon</option>
                    <option value="EXPIRED">Expired</option>
                  </select>

                  <select
                    className="px-4 py-2 rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="warrantyEndDate">Warranty End Date</option>
                    <option value="purchaseDate">Purchase Date</option>
                    <option value="name">Name</option>
                    <option value="brand">Brand</option>
                  </select>

                  <select
                    className="px-4 py-2 rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
                    value={direction}
                    onChange={(e) =>
                      setDirection(e.target.value as "asc" | "desc")
                    }
                  >
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                  </select>

                  <button
                    onClick={fetchProducts}
                    className="px-5 py-2 rounded-2xl bg-black text-white font-semibold hover:opacity-90 shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  >
                    Refresh
                  </button>

                  <button
                    onClick={() => setOpenAdd(true)}
                    className="px-5 py-2 rounded-2xl bg-black text-white font-semibold hover:opacity-90 shadow-sm"
                  >
                    + Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Products</h2>
              <p className="text-sm text-gray-500">
                Showing {filtered.length} of {products.length} →
              </p>
            </div>

            {/* Errors */}
            {error && (
              <div className="mt-3 bg-rose-100 text-rose-700 p-4 rounded-3xl border border-rose-200">
                {error}
              </div>
            )}

            {/* List */}
            <div className="mt-4">
              {loading ? (
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-gray-600">
                  Loading...
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm text-gray-600">
                  No products found.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((p) => (
                   <ProductCard
  key={p.id}
  product={p}
  onEdit={(prod) => setEditProduct(prod)}
  onDelete={(prod) => setDeleteProduct(prod)}
/>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      

      {/* Modal */}
    <Modal
  open={!!editProduct}
  title="Edit Product"
  onClose={() => setEditProduct(null)}
>
  <ProductForm
    product={editProduct}
    onSaved={() => {
      fetchProducts();
      setEditProduct(null);
    }}
  />
</Modal>
<Modal
  open={!!deleteProduct}
  title="Confirm Delete"
  onClose={() => setDeleteProduct(null)}
>
  <DeleteConfirm
    title={`Delete "${deleteProduct?.name}"?`}
    loading={deleteLoading}
    onCancel={() => setDeleteProduct(null)}
    onConfirm={async () => {
      if (!deleteProduct) return;

      try {
        setDeleteLoading(true);
        await api.delete(`/products/${deleteProduct.id}`);
        setDeleteProduct(null);
        fetchProducts();
      } catch {
        alert("Failed to delete product");
      } finally {
        setDeleteLoading(false);
      }
    }}
  />
</Modal>
    </div>
  );
}
