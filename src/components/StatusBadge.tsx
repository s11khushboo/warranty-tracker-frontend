import type { ProductStatus } from "../types/product";

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const base =
    "text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-2";

  if (status === "ACTIVE") {
    return <span className={`${base} bg-emerald-100 text-emerald-700`}>● Active</span>;
  }

  if (status === "EXPIRING_SOON") {
    return <span className={`${base} bg-amber-100 text-amber-700`}>● Expiring soon</span>;
  }

  return <span className={`${base} bg-rose-100 text-rose-700`}>● Expired</span>;
}
