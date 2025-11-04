import type { Category, CategorySummary } from "./category";

export const TransactionType = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  categoryId: string;
  date: string | Date;
  category: Category;
  type: TransactionType;
  paymentMethod?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  expenseByCategory: CategorySummary[];
}

export interface CreateTransactionDTO {
  description: string;
  amount: number;
  date: Date | string;
  categoryId: string;
  type: TransactionType;
  paymentMethod?: string;
}

export interface MonthlyItem {
  name: string;
  expense: number;
  income: number;
}
