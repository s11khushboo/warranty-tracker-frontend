import type { Product } from "../types/product";
import StatusBadge from "./StatusBadge";

export default function ProductCard({ product }: { product: Product }) {
  const isExpired = product.status === "EXPIRED";

  return (
   <div className="rounded-[22px] bg-white border border-gray-100
shadow-[0_10px_30px_rgba(0,0,0,0.06)]
hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
hover:-translate-y-0.5 transition-all p-5">
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

        {product.receiptUrl ? (
          <a
            href={`http://localhost:8080${product.receiptUrl}`}
            target="_blank"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View receipt →
          </a>
        ) : (
          <span className="text-sm text-gray-400">No receipt</span>
        )}
      </div>
    </div>
  );
}
