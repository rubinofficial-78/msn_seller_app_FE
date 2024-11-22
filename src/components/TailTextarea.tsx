import React from "react";

interface TailTextareaProps {
  disabled?: boolean;
  fieldKey: string;
  label?: string;
  value: string;
  description?: string;
  handleInputonChange?: (key: string, value: any, index?: number) => void;
  index?: number;
}

const TailTextarea: React.FC<TailTextareaProps> = ({
  disabled,
  fieldKey,
  value,
  handleInputonChange,
  index,
  ...props
}) => {
  return (
    <textarea
      disabled={disabled}
      value={value}
      onChange={(e) => handleInputonChange?.(fieldKey, e.target.value, index)}
      rows={4}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
      `}
      {...props}
    />
  );
};

export default TailTextarea;
