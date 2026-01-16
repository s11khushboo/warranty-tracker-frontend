import type { Product } from "../types/product";
import StatusBadge from "./StatusBadge";

type Props = {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const isExpired = product.status === "EXPIRED";

  return (
    <div className="rounded-[22px] bg-white border border-gray-100
      shadow-[0_10px_30px_rgba(0,0,0,0.06)]
      hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
      hover:-translate-y-0.5 transition-all p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">{product.name}</p>
          <p className="text-sm text-gray-500 mt-1">
            {product.brand || "No brand"} • Purchased {product.purchaseDate}
          </p>
        </div>

        <StatusBadge status={product.status} />
      </div>

      <div className="mt-4 pt-4 flex items-end justify-between border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">
            {isExpired ? "Warranty ended" : "Warranty ends"}
          </p>
          <p className="font-semibold text-gray-900">{product.warrantyEndDate}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm hover:bg-gray-50 text-sm font-semibold"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(product)}
            className="px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 shadow-sm hover:bg-red-100 text-sm font-semibold"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {product.receiptUrl && (
        <div className="mt-3">
          <a
            href={`http://localhost:8080${product.receiptUrl}`}
            target="_blank"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View receipt →
          </a>
        </div>
      )}
    </div>
  );
}
