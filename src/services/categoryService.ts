import type { Category } from "../types/category";
import type { PaymentMethod } from "../types/paymentMethod";
import { api } from "./api";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch {
    throw new Error("Erro ao buscar categorias");
  }
};

export const getPaymentMethod = async (): Promise<PaymentMethod[]> => {
  try {
    const responsePayment = await api.get("/pagamentos");
    return responsePayment.data;
  } catch {
    throw new Error("Erro ao buscar pagamentos");
  }
};
