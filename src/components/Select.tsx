import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select = ({
  options,
  label,
  error,
  icon,
  fullWidth = true,
  /* className = "",
  id, */
  ...rest
}: SelectProps) => {
  const selectId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const handleToglle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm text-gray-50 mb-4">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 top-5.5 left-2.5 pl-0 flex items-center text-gray-50">
            {icon}
          </div>
        )}
      </div>
      <select
        id={selectId}
        {...rest}
        onMouseDown={handleToglle}
        onBlur={handleBlur}
        className={`block w-full pl-9 pr-4 py-2.5 text-gray-50 bg-gray-700 rounded-xl outline-none border ${error ? "border-red-600" : "border-primary-500"} 
        ${error ? "focus:border-red-600" : "focus:border-primary-500"} appearance-none
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-50 font-medium">
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-0 top-12 pr-3">
        <ChevronDown
          className={`{w-5 h-5 text-gray-50 ${isOpen ? "rotate-180" : "rotate-0"} transition-all ease-in-out`}
        />
      </div>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default Select;
