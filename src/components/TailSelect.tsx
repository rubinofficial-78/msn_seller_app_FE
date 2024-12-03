import React from 'react';

interface TailSelectProps {
  fieldKey: string;
  Data: Array<{
    label: string;
    value: any;
    description?: string;
  }>;
  placeholder?: string;
  value?: any;
  handleSelectonChange: (key: string, value: any) => void;
  index?: number;
  required?: boolean;
  disabled?: boolean;
}

const TailSelect: React.FC<TailSelectProps> = ({
  fieldKey,
  Data,
  placeholder,
  value,
  handleSelectonChange,
  index,
  required,
  disabled
}) => {
  const selectedOption = Data.find(item => item.value === value);

  return (
    <div className="relative mt-1">
      <select
        value={value || ''}
        onChange={(e) => handleSelectonChange(fieldKey, e.target.value)}
        className={`
          appearance-none block w-full rounded-md border-0 py-2 pl-3 pr-10 
          text-gray-900 ring-1 ring-inset ring-gray-300 
          focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {Data.map((item, idx) => (
          <option 
            key={idx} 
            value={item.value}
            title={item.description}
            selected={item.value === value}
          >
            {item.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </div>
    </div>
  );
};

export default TailSelect;
