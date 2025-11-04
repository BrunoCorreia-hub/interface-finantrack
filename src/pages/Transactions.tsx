/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { AlertCircle, ArrowDown, ArrowUp, Circle, Plus, Search, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router";
import MonthYearSelected from "../components/MonthYearSelected";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { deleteTransaction, getTransactions } from "../services/transactionService";
import { TransactionType, type Transaction } from "../types/transactions";
import Button from "../components/Button";
import { formatCurrency, formatDate } from "../utils/formater";
import { toast } from "react-toastify";
import { getPaymentMethod } from "../services/categoryService";
import type { PaymentMethod } from "../types/paymentMethod";

const Transactions = () => {
  const location = useLocation();
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [delitingId, setDelitingId] = useState<string>("");
  const [payment, setPayment] = useState<PaymentMethod[]>([]);

  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredInputTransactions, setFilteredInputTransactions] = useState<Transaction[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await getTransactions({ month, year });
      setTransactions(data);
      setFilteredInputTransactions(data);
    } catch {
      setError("Erro ao buscar transações, tente novamente");
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLoadPayment = async (): Promise<void> => {
      const response = await getPaymentMethod();
      setPayment(response);
    };
    getLoadPayment();
  }, []);

  useEffect(() => {
    if (location.state?.shouldReload) {
      fetchTransactions();
    }
  }, [location.state]);

  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleDeleteTransaction = async (id: string): Promise<void> => {
    try {
      setDelitingId(id);
      await deleteTransaction(id);
      setFilteredInputTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação deletada com sucesso");
    } catch {
      toast.error("Falha ao deletar transação, tente novamente");
    } finally {
      setDelitingId("");
    }
  };

  const confirmDeleteTransaction = (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar esta transação?")) {
      handleDeleteTransaction(id);
    }
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
    setFilteredInputTransactions(
      transactions.filter((t) =>
        t.description.toUpperCase().includes(event.target.value.toUpperCase()),
      ),
    );
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-200 md:mb-0">Transações</h1>
        <Link
          to="/transacoes/nova"
          className="flex flex-row items-center justify-center gap-2 bg-primary-500 p-2.5 rounded-xl hover:bg-primary-700 hover:text-zinc-200 hover:transition-all"
        >
          <Plus className="w-4 h-4" />
          Nova Transação
        </Link>
      </div>
      <Card>
        <MonthYearSelected
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </Card>
      <Card className="mt-5 mb-6">
        <Input
          placeholder="Buscar transações"
          icon={<Search />}
          onChange={handleSearchInput}
          value={searchInput}
        />
      </Card>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-8 flex items-center justify-center flex-col">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-1" />
            <p className="text-gray-300 mb-5">{error}</p>
            <Button onClick={fetchTransactions} className="mx-auto mt-10">
              Tentar Novamente
            </Button>
          </div>
        ) : filteredInputTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhuma Transação Encontrada</p>
            <Link
              to="/transacoes/nova"
              className="flex flex-row items-center justify-center w-fit mx-auto mt-6 gap-2 bg-primary-500 p-2.5 rounded-xl hover:bg-primary-700 hover:text-zinc-200 hover:transition-all"
            >
              <Plus className="w-4 h-4" />
              Nova Transação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Valor
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Pagamento
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-gray-500 uppercase text-start"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredInputTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700">
                    <td className="py-6 px-3">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <span className="text-gray-200 px-2 text-sm font-medium">
                          {transaction.description}
                        </span>
                      </div>
                    </td>

                    <td className="py-6 px-3 text-gray-200 text-sm font-medium whitespace-nowrap">
                      {formatDate(transaction.date)}
                    </td>

                    <td className="py-6 px-3 text-gray-200 text-sm font-medium whitespace-nowrap">
                      <div className="flex gap-2 items-center">
                        <Circle
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: transaction.category.color }}
                        />
                        <div>{transaction.category.name}</div>
                      </div>
                    </td>

                    <td className="py-6 px-3 text-gray-200 text-sm font-medium whitespace-nowrap">
                      <span
                        className={`${transaction.type === TransactionType.INCOME ? "text-primary-500" : "text-red-600"}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>

                    <td className="py-6 px-3">
                      <span className="text-gray-50 text-sm font-semibold py-3">
                        {payment.find((p) => p.id === transaction.paymentMethod)?.name || "_"}
                      </span>
                    </td>

                    <td className="py-6 px-3 text-gray-200 text-sm font-medium whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => confirmDeleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-600"
                        disabled={delitingId === transaction.id}
                      >
                        {delitingId === transaction.id ? (
                          <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 cursor-pointer" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
