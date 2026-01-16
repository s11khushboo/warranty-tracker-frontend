import { useEffect, useState } from "react";
import api from "../api/axios";
import type { Product } from "../types/product";

type Props = {
  onSaved: () => void;
  product?: Product | null; // ✅ if passed => edit mode
};

export default function ProductForm({ onSaved, product }: Props) {
  const isEdit = !!product;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyMonths, setWarrantyMonths] = useState<number>(12);
  const [receiptUrl, setReceiptUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand || "");
      setPurchaseDate(product.purchaseDate);
      setWarrantyMonths(product.warrantyMonths);
      setReceiptUrl(product.receiptUrl || "");
    }
  }, [product]);

  const resetForm = () => {
    setName("");
    setBrand("");
    setPurchaseDate("");
    setWarrantyMonths(12);
    setReceiptUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) return setError("Product name is required");
    if (!purchaseDate) return setError("Purchase date is required");
    if (!warrantyMonths || warrantyMonths < 1)
      return setError("Warranty months must be at least 1");

    try {
      setLoading(true);

      const payload = {
        name,
        brand,
        purchaseDate,
        warrantyMonths,
        receiptUrl: receiptUrl || null,
      };

      if (isEdit && product) {
        await api.put(`/products/${product.id}`, payload);
        setSuccess("✅ Product updated!");
      } else {
        await api.post(`/products`, payload);
        setSuccess("✅ Product added!");
        resetForm();
      }

      onSaved();
    } catch {
      setError(isEdit ? "Failed to update product" : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <h2 className="text-lg font-bold mb-4">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      {error && (
        <div className="mb-3 bg-red-100 text-red-700 p-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-3 bg-green-100 text-green-700 p-3 rounded-xl text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-700">Name *</label>
          <input
            className="w-full border rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. iPhone 13"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-700">Brand</label>
          <input
            className="w-full border rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. Apple"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-700">
            Purchase Date *
          </label>
          <input
            type="date"
            className="w-full border rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-700">
            Warranty Months *
          </label>
          <input
            type="number"
            className="w-full border rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            value={warrantyMonths}
            min={1}
            onChange={(e) => setWarrantyMonths(Number(e.target.value))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Receipt URL</label>
          <input
            className="w-full border rounded-xl px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-black"
            placeholder="https://..."
            value={receiptUrl}
            onChange={(e) => setReceiptUrl(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Add Product"}
          </button>

          {!isEdit && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-4 py-2 rounded-xl font-semibold hover:bg-gray-50"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
