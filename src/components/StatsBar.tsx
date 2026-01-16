import type { Product } from "../types/product";

function StatCard({
  title,
  value,
  subtitle,
  tint,
}: {
  title: string;
  value: number;
  subtitle: string;
  tint: "green" | "yellow" | "red";
}) {
  const styles =
    tint === "green"
      ? "bg-gradient-to-b from-emerald-50 to-white border-emerald-200"
      : tint === "yellow"
      ? "bg-gradient-to-b from-amber-50 to-white border-amber-200"
      : "bg-gradient-to-b from-rose-50 to-white border-rose-200";

  const pill =
    tint === "green"
      ? "bg-emerald-100 text-emerald-700"
      : tint === "yellow"
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";

  return (
  <div className={`rounded-[22px] border ${styles} p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)]`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm font-bold ${pill}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

export default function StatsBar({ products }: { products: Product[] }) {
  const active = products.filter((p) => p.status === "ACTIVE").length;
  const soon = products.filter((p) => p.status === "EXPIRING_SOON").length;
  const expired = products.filter((p) => p.status === "EXPIRED").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Active" value={active} subtitle="Safe & covered" tint="green" />
      <StatCard title="Expiring Soon" value={soon} subtitle="Next 30 days" tint="yellow" />
      <StatCard title="Expired" value={expired} subtitle="Needs attention" tint="red" />
    </div>
  );
}
