import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { TransactionType, type CreateTransactionDTO } from "../types/transactions";
import { getCategories, getPaymentMethod } from "../services/categoryService";
import type { Category } from "../types/category";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import Card from "../components/Card";
import Input from "../components/Input";
import { AlertCircle, Calendar, DollarSign, Save, Tag, Wallet } from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { createTransaction } from "../services/transactionService";
import { toast } from "react-toastify";
import type { PaymentMethod } from "../types/paymentMethod";

interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
  paymentMethod: string;
}

const initialFormData: FormData = {
  description: "",
  amount: 0,
  date: "",
  categoryId: "",
  type: TransactionType.EXPENSE,
  paymentMethod: "",
};

const TransactionForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch {
        toast.error("Erro ao carregar categorias");
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadPaymentMethod = async (): Promise<void> => {
      try {
        const response = await getPaymentMethod();
        setPaymentMethod(response);
      } catch {
        toast.error("Erro ao carregar formas de pagamento");
      }
    };

    loadPaymentMethod();
  }, []);

  const filteredCategories = categories.filter((category) => category.type === formData.type);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Adicione uma descrição.";
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = "O valor deve ser maior que 0.";
    }

    if (!formData.date) {
      newErrors.date = "Adicione uma data.";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Selecione uma categoria.";
    }

    if (formData.type === "expense" && !formData.paymentMethod) {
      newErrors.paymentMethod = "Selecione uma forma de pagamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData((prev) => ({ ...prev, type: itemType, categoryId: "" }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // limpa erro do campo conforme o usuário digita
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) return;

    try {
      const dataToSend: CreateTransactionDTO = {
        ...formData,
        date: `${formData.date}T12:00:00.000Z`,
      };

      if (formData.type === "income") {
        delete dataToSend.paymentMethod;
      }

      toast.success("Transação criada com sucesso");
      await new Promise((tempo) => setTimeout(tempo, 2000));
      navigate("/transacoes", { state: { shouldReload: true } });
      await createTransaction(dataToSend);
      setFormData({
        description: "",
        amount: 0,
        date: "",
        categoryId: "",
        type: "expense",
        paymentMethod: "",
      });
    } catch {
      toast.error("Erro ao criar transação, tente novamente");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/transacoes");
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-gray-200 mb-4">Nova Transação</h1>

        <Card>
          {Object.keys(errors).length > 0 && (
            <div className="flex items-center bg-red-400 border border-red-700 px-3 py-3 rounded-xl gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-700" />
              <p className="text-red-700">Preencha todos os campos.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor={formId} className="text-sm font-medium text-gray-200">
                Tipo de Transação
              </label>
              <TransactionTypeSelector
                id={formId}
                onChange={handleTransactionType}
                value={formData.type}
              />
            </div>

            <Input
              label="Descrição"
              name="description"
              placeholder="Ex: Supermercado, transporte, etc..."
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />

            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              icon={<DollarSign className="w-4 h-4" />}
              onChange={handleChange}
              error={errors.amount}
            />
            {formData.type === "expense" && (
              <Select
                label="Forma de pagamento"
                name="paymentMethod"
                value={formData.paymentMethod}
                icon={<Wallet className="w-4 h-4 text-gray-400" />}
                onChange={handleChange}
                options={[
                  { value: "", label: "Selecione uma forma de pagamento" },
                  ...paymentMethod.map((payment) => ({
                    value: payment.id,
                    label: payment.name,
                  })),
                ]}
                error={errors.paymentMethod}
              />
            )}

            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              icon={<Calendar className="w-4 h-4" />}
              onChange={handleChange}
              error={errors.date}
            />

            <Select
              label="Categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
              error={errors.categoryId}
            />

            <div className="flex justify-end space-x-3 mt-4">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center mr-2">
                    <div
                      className={`w-4 h-4 border-4 ${formData.type === TransactionType.EXPENSE ? "border-white" : "border-gray-750"} border-dashed rounded-full animate-spin`}
                    ></div>
                  </div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TransactionForm;
