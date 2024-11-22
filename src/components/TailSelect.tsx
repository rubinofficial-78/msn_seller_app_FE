import React, { useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Check, ChevronDown, Trash2 } from 'lucide-react';

interface Option {
  id: string | number;
  label: string;
  value: any;
}

interface TailSelectProps {
  fieldKey: string;
  index?: number;
  Data?: Option[];
  placeholder?: string;
  selectedData?: Option[];
  handleProductSelect?: (option: Option) => void;
  deleteData?: (index: number) => void;
  handleSelectonChange?: (key: string, value: Option, index?: number) => void;
  value?: Option;
}

const TailSelect: React.FC<TailSelectProps> = ({
  fieldKey,
  index,
  Data = [],
  placeholder,
  selectedData,
  handleProductSelect,
  deleteData,
  handleSelectonChange,
  value
}) => {
  const [query, setQuery] = useState("");
  const targetButtonRef = useRef<HTMLButtonElement>(null);

  const filteredOptions = query === ""
    ? Data
    : Data.filter(option => 
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <Combobox
      value={value}
      onChange={(option: Option) => {
        handleProductSelect?.(option);
        handleSelectonChange?.(fieldKey, option, index);
      }}
    >
      <div className="relative">
        <Combobox.Input
          placeholder={`Select ${placeholder}`}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onClick={() => targetButtonRef.current?.click()}
          displayValue={(option: Option) => option?.label ?? ''}
        />
        <Combobox.Button
          ref={targetButtonRef}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.map((option) => (
            <Combobox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? "bg-primary-100 text-primary-900" : "text-gray-900"
                }`
              }
            >
              {({ active, selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                      active ? "text-primary-900" : "text-primary-600"
                    }`}>
                      <Check className="h-5 w-5" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>

      {selectedData?.length > 0 && (
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700">Selected Items</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1">
                <span className="text-sm">{item.label}</span>
                <button
                  onClick={() => deleteData?.(idx)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default TailSelect;
