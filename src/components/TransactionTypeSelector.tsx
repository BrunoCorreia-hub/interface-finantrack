import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectorProps {
  value: TransactionType;
  id?: string;
  onChange: (type: TransactionType) => void;
}

const TransactionTypeSelector = ({ onChange, value, id }: TransactionTypeSelectorProps) => {
  const transactionTypeButton = [
    {
      type: TransactionType.EXPENSE,
      label: "Despesas",
      activeClass: "bg-red-500 border-red-500 text-red-700 font-medium uppercase",
      inativeClass: "bg-transparent border-red-300 text-red-600 hover:bg-red-50",
    },
    {
      type: TransactionType.INCOME,
      label: "Receitas",
      activeClass: "bg-primary-500 border-primary-500 text-green-700 font-medium uppercase",
      inativeClass: "bg-transparent border-primary-300 text-primary-600 hover:bg-green-50",
    },
  ];

  return (
    <fieldset id={id} className="grid grid-cols gap-4 md:grid-cols-2">
      {transactionTypeButton.map((item) => (
        <button
          key={item.type}
          type="button"
          onClick={() => onChange(item.type)}
          className={`flex items-center justify-center border rounded-md px-2 py-2 transition-all cursor-pointer
                ${value === item.type ? item.activeClass : item.inativeClass}
                `}
        >
          {item.label}
        </button>
      ))}
    </fieldset>
  );
};

export default TransactionTypeSelector;
