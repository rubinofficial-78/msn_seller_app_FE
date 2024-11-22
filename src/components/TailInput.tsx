import React from 'react';

interface TailInputProps {
  disabled?: boolean;
  fieldKey: string;
  label?: string;
  value: string;
  type?: string;
  placeholder?: string;
  handleInputonChange?: (key: string, value: any, index?: number) => void;
  index?: number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TailInput: React.FC<TailInputProps> = ({
  disabled,
  fieldKey,
  value,
  type = 'text',
  placeholder,
  handleInputonChange,
  index,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {startIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {startIcon}
        </div>
      )}
      <input
        disabled={disabled}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleInputonChange?.(fieldKey, e.target.value, index)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all
          ${startIcon ? 'pl-10' : ''}
          ${endIcon ? 'pr-10' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
        {...props}
      />
      {endIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default TailInput; 