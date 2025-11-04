import type { TransactionType } from "./transactions";

export interface Category {
  id: string;
  color: string;
  name: string;
  type: TransactionType;
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  amount: number;
  percentage: number;
  [key: string]: string | number;
}
