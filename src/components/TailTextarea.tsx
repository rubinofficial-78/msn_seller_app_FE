import React from 'react';

interface TailTextareaProps {
  index?: number;
  fieldKey: string;
  label?: string;
  description?: string;
  handleInputonChange?: (key: string, value: string, index?: number) => void;
  value?: string | null;
  disabled?: boolean;
}

const TailTextarea: React.FC<TailTextareaProps> = ({
  index,
  fieldKey,
  label = "",
  description = "",
  handleInputonChange,
  value = null,
  disabled = false
}) => {
  return (
    <>
      <textarea
        id={fieldKey}
        name={fieldKey}
        rows={3}
        placeholder={label}
        className={`${
          disabled ? "cursor-not-allowed" : "cursor-text"
        } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        value={value || ''}
        disabled={disabled}
        onChange={(e) => handleInputonChange?.(fieldKey, e.target.value, index)}
      />

      {description && (
        <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>
      )}
    </>
  );
};

export default TailTextarea; 