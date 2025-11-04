import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type InputsVariants = "primary" | "success" | "danger" | "outline";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  icon?: ReactNode;
  label?: string;
  error?: string;
  id?: string;
  variant?: InputsVariants;
}

const Input = ({
  fullWidth,
  icon,
  label,
  error,
  id,
  className = "",
  variant = "primary",
  ...rest
}: InputProps) => {
  const inputVariantClasses: Record<InputsVariants, string> = {
    primary:
      "border border-primary-500 bg-gray-700 text-gray-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50",
    success:
      "border border-green-500 bg-gray-700 text-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-500/50",
    danger:
      "border border-red-600 bg-gray-700 text-gray-50 focus:border-red-600 focus:ring-2 focus:ring-red-600/50",
    outline:
      "border border-primary-500 bg-transparent text-primary-500 focus:ring-2 focus:ring-primary-500/50",
  };

  const generatedId = useId();
  const inputId = id || generatedId;

  const effectiveVariant: InputsVariants = error ? "danger" : variant;

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-zinc-200 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          className={`block w-full rounded-xl px-4 py-3 text-sm text-gray-50 placeholder:text-gray-500 
            transition-all duration-200 outline-none 
            ${inputVariantClasses[effectiveVariant]} 
            ${icon ? "pl-9" : ""} 
            ${className}
          `}
          {...rest}
        />
      </div>

      {error && <p className="mt-1.5 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
