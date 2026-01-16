type Props = {
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function DeleteConfirm({
  title = "Delete this product?",
  onCancel,
  onConfirm,
  loading,
}: Props) {
  return (
    <div>
      <p className="text-gray-700">
        {title} This action cannot be undone.
      </p>

      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
