import React from 'react';

interface TailInputProps {
  fieldKey: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  handleInputonChange: (key: string, value: string) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  index?: number;
}

const TailInput: React.FC<TailInputProps> = ({
  fieldKey,
  value,
  type = 'text',
  placeholder,
  required,
  disabled,
  handleInputonChange,
  startIcon,
  endIcon,
  index
}) => {
  return (
    <div className="relative mt-1">
      {startIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputonChange(fieldKey, e.target.value)}
        className={`
          block w-full rounded-md border-0 py-2
          ${startIcon ? 'pl-10' : 'pl-3'}
          ${endIcon ? 'pr-10' : 'pr-3'}
          text-gray-900 ring-1 ring-inset ring-gray-300 
          focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {endIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default TailInput; 