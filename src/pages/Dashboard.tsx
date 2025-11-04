import { useEffect, useState } from "react";
import MonthYearSelected from "../components/MonthYearSelected";
import { getTransactionMonthly, getTransactionsSummary } from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import { AArrowDown, AArrowUp, TrendingUp, Wallet, Calendar } from "lucide-react";
import { formatCurrency } from "../utils/formater";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type PieLabelRenderProps,
} from "recharts";

const initialSummary: TransactionSummary = {
  balance: 0,
  totalExpenses: 0,
  totalIncome: 0,
  expenseByCategory: [],
};

interface ChartLabelProps {
  categoryName: string;
  percent: number;
}

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
  const [dataMonthly, setDataMonthly] = useState<MonthlyItem[]>([]);

  useEffect(() => {
    async function loadTransactionsSummary() {
      const response = await getTransactionsSummary(month, year);
      setSummary(response);
    }

    loadTransactionsSummary();
  }, [month, year]);

  useEffect(() => {
    async function loadTransactionsMonthly() {
      const response = await getTransactionMonthly(month, year, 5);
      setDataMonthly(response.history);
    }

    loadTransactionsMonthly();
  }, [month, year]);

  const renderPieChartLabel = ({ name, percent }: PieLabelRenderProps): string => {
    const chartLabel: ChartLabelProps = {
      categoryName: name as string,
      percent: (percent as number) ?? 0,
    };

    return `${chartLabel.categoryName}: ${(chartLabel.percent * 100).toFixed(1)}%`;
  };

  const formatTooTipValue = (value: number | string): string => {
    return formatCurrency(typeof value === "number" ? value : 0);
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-center lg:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 text-white md:mb-0">Dashboard</h1>
        <MonthYearSelected
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <Card
          icon={
            <Wallet
              size={20}
              className={`${summary.balance > 0 ? "text-primary-500" : "text-red-600"}`}
            />
          }
          title="Saldo"
          glowEffect
          hover
        >
          <p
            className={`text-2xl font-semibold 
          ${summary.balance > 0 ? "text-primary-500" : "text-red-600"}`}
          >
            {formatCurrency(summary.balance)}
          </p>
        </Card>

        <Card icon={<AArrowUp size={20} className="text-primary-500" />} title="Entradas" hover>
          <p className="text-2xl font-semibold text-primary-500">
            {formatCurrency(summary.totalIncome)}
          </p>
        </Card>

        <Card icon={<AArrowDown size={20} className="text-red-700" />} title="Saídas" hover>
          <p className="text-2xl font-semibold text-red-700">
            {formatCurrency(summary.totalExpenses)}
          </p>
        </Card>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-3">
          <Card
            icon={<TrendingUp size={20} className="text-primary-500" />}
            title="Despesas por Categoria"
            className="min-h-80"
          >
            {summary.expenseByCategory.length > 0 ? (
              <div className="h-72 mt-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={summary.expenseByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="amount"
                      nameKey="categoryName"
                      label={renderPieChartLabel}
                    >
                      {summary.expenseByCategory.map((entry) => (
                        <Cell key={entry.categoryId} fill={entry.categoryColor} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatTooTipValue} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-55 text-gray-500">
                Nenhuma transação registrada nesse periodo
              </div>
            )}
          </Card>
          <Card
            icon={<Calendar size={20} className="text-primary-500" />}
            title="Histórico de Transações Mensal"
            className="min-h-80"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={dataMonthly}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{ style: { textTransform: "capitalize", fontSize: 13 } }}
                    interval={0}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ style: { textTransform: "capitalize", fontSize: 10 } }}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    formatter={formatCurrency}
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      borderColor: "#2a2a2a",
                      borderRadius: 5,
                    }}
                    labelStyle={{ color: "#ffff" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="expense"
                    name="Despesas"
                    fill="#b20e20"
                    activeBar={<Rectangle fill="#870925" stroke="purple" />}
                  />
                  <Bar
                    dataKey="income"
                    name="Entradas"
                    fill="#37E359"
                    activeBar={<Rectangle fill="#228a36" stroke="blue" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
