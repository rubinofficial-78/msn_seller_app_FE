import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface TailSelectProps {
  fieldKey: string;
  Data: Array<{ value: string; label: string }>;
  placeholder?: string;
  value: string | string[];
  handleSelectonChange: (key: string, value: any, index?: number) => void;
  index?: number;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
}

const TailSelect: React.FC<TailSelectProps> = ({
  fieldKey,
  Data,
  placeholder,
  value,
  handleSelectonChange,
  index,
  required,
  disabled,
  multiple
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedValues = Array.isArray(value) ? value : [value].filter(Boolean);
  const selectedLabels = selectedValues.map(val => 
    Data.find(item => item.value === val)?.label || val
  );

  const handleSelect = (selectedValue: string) => {
    if (!multiple) {
      handleSelectonChange(fieldKey, selectedValue, index);
      setIsOpen(false);
      return;
    }

    let newValues: string[];
    if (selectedValue === 'all') {
      newValues = selectedValues.includes('all') ? [] : ['all'];
    } else {
      newValues = selectedValues.filter(v => v !== 'all');
      if (newValues.includes(selectedValue)) {
        newValues = newValues.filter(v => v !== selectedValue);
      } else {
        newValues.push(selectedValue);
      }
    }

    handleSelectonChange(fieldKey, newValues, index);
  };

  const removeValue = (valueToRemove: string) => {
    const newValues = selectedValues.filter(v => v !== valueToRemove);
    handleSelectonChange(fieldKey, newValues, index);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div 
          className={`
            min-h-[42px] px-3 py-1.5 border border-gray-300 rounded-lg 
            focus-within:ring-1 focus-within:ring-primary-500 
            ${disabled ? 'bg-gray-50' : 'bg-white'} 
            cursor-pointer
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1 pr-8">
            {selectedValues.length > 0 ? (
              selectedLabels.map((label, idx) => (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-sm"
                >
                  {label}
                  {multiple && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeValue(selectedValues[idx]);
                      }}
                      className="hover:text-gray-700"
                    >
                      <X size={14} className="text-gray-400" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <span className="text-gray-500 py-1">{placeholder}</span>
            )}
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {Data.map((item, i) => (
            <div
              key={i}
              className={`
                px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2
                ${selectedValues.includes(item.value) ? 'bg-gray-50' : ''}
              `}
              onClick={() => handleSelect(item.value)}
            >
              {multiple && (
                <div className={`
                  w-4 h-4 border rounded 
                  ${selectedValues.includes(item.value) 
                    ? 'bg-primary-600 border-primary-600' 
                    : 'border-gray-300'
                  }
                  flex items-center justify-center
                `}>
                  {selectedValues.includes(item.value) && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                      <path
                        fill="currentColor"
                        d="M3.795 6.795L2.295 5.295a1 1 0 0 0-1.41 1.41l2.5 2.5a1 1 0 0 0 1.41 0l6-6a1 1 0 0 0-1.41-1.41L3.795 6.795z"
                      />
                    </svg>
                  )}
                </div>
              )}
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TailSelect;
