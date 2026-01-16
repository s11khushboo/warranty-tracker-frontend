export type ProductStatus = "ACTIVE" | "EXPIRING_SOON" | "EXPIRED";

export type Product = {
  id: string;
  name: string;
  brand: string;
  purchaseDate: string;
  warrantyMonths: number;
  warrantyEndDate: string;
  receiptUrl?: string;
  status: ProductStatus;
};
