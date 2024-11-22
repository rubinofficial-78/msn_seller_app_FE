import React from 'react';
import dayjs from 'dayjs';

interface TailInputProps {
  index?: number;
  fieldKey: string;
  label?: string;
  value?: string | number;
  options?: string[];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'text' | 'number' | 'email' | 'date';
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  handleInputonChange?: (key: string, value: string, index?: number) => void;
}

const TailInput: React.FC<TailInputProps> = ({
  index,
  fieldKey,
  label,
  value,
  options = [],
  startIcon,
  endIcon,
  type = "text",
  helperText,
  disabled = false,
  placeholder = "",
  handleInputonChange
}) => {
  const hasOptionsOrIcon = options.length > 0 || startIcon;
  const hasStartIcon = !!startIcon;
  const hasEndIcon = !!endIcon;
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className={`relative w-full min-w-[100px] rounded-md shadow-sm ${hasOptionsOrIcon ? "relative" : ""}`}>
      {hasStartIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{startIcon}</span>
        </div>
      )}
      
      <input
        type={type}
        name={fieldKey}
        id={fieldKey}
        value={value ?? ''}
        className={`block hover:outline-1 hover:outline w-full rounded-md border-0 py-1.8 
          ${hasStartIcon ? "pl-7" : "pl-3"}
          ${hasEndIcon ? "pr-7" : ""}
          ${options.length ? "pr-20" : ""} 
          ${disabled ? "cursor-not-allowed" : type === "date" ? "cursor-pointer" : "cursor-text"}
          text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-[1.5px] focus:ring-inset focus:ring-[#0675e3] 
          sm:text-sm sm:leading-6`}
        placeholder={placeholder || label}
        onChange={(e) => handleInputonChange?.(fieldKey, e.target.value, index)}
        disabled={disabled}
        max={type === 'date' ? today : undefined}
      />

      {hasEndIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{endIcon}</span>
        </div>
      )}

      {options.length > 0 && (
        <div className="absolute inset-y-0 right-0 border-l flex items-center">
          <label htmlFor="currency" className="sr-only">Units</label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {options.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      )}

      {helperText && (
        <div className="errorMessage pt-2 pl-2">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TailInput; 