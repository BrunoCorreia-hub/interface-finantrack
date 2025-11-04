import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId } from "react";

interface MonthYearSelectedProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const monthNames: readonly string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MonthYearSelected = ({
  month,
  onMonthChange,
  year,
  onYearChange,
}: MonthYearSelectedProps) => {
  const currentYear = new Date().getFullYear();
  const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const selectId = useId();

  const handleNextMonth = (): void => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const handlePrevMonth = (): void => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-gray-700 rounded-lg p-3 border-gray-950">
      <button
        onClick={handlePrevMonth}
        type="button"
        className="p-2 rounded-full hover:bg-gray-750 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Mês Anterior"
      >
        <ChevronLeft />
      </button>
      <div className="flex gap-2">
        <label htmlFor={selectId} className="sr-only">
          Selecionar Mês
        </label>
        <select
          onChange={(e) => onMonthChange(Number(e.target.value))}
          value={month}
          id={selectId}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-white focus:outline-none focus:ring-1 cursor-pointer"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor={selectId} className="sr-only">
          Selecionar Ano
        </label>
        <select
          onChange={(e) => onYearChange(Number(e.target.value))}
          value={year}
          id={selectId}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-white focus:outline-none focus:ring-1 cursor-pointer"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleNextMonth}
        type="button"
        className="p-2 rounded-full hover:bg-gray-750 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Proximo Mês"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthYearSelected;
