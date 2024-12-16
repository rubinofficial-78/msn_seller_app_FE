import React from "react";
import {
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  Switch,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "lucide-react";
import TailSelect from "./TailSelect";
import TailInput from "./TailInput";
import TailTextarea from "./TailTextarea";
import ImageUpload from "./ImageUpload";

interface Field {
  type: string;
  key: string;
  label?: string;
  field_name?: string;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  options?: any[];
  multiple?: boolean;
  placeholder?: string;
  styling?: string;
  length?: string;
  description?: string;
  note?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  component?: React.ReactNode;
  accept?: string;
  onChange?: (value: any) => void;
  uploadBoxStyle?: string;
  uploadText?: string;
  uploadDescription?: string;
  radioStyle?: string;
  maxLength?: number;
  validation?: (value: any) => boolean;
  error?: string;
  preview?: string;
}

interface AddFormProps {
  index?: number;
  data: Field[];
  handleFileSelect?: (files: FileList) => void;
  deleteImage?: (index: number) => void;
  imageLinks?: string[];
  handleProductSelect?: (option: any) => void;
  selectedData?: any[];
  deleteData?: (index: number) => void;
  handleInputonChange?: (key: string, value: any, index?: number) => void;
  handleSelectonChange?: (key: string, value: any, index?: number) => void;
  handelCheckBoxonChange?: (field: Field) => void;
  onRadioChange?: (value: string) => void;
  ontimeupdate?: (value: any) => void;
  edit?: boolean;
  handleLocation?: () => void;
  handleRadioChange?: (key: string, value: string) => void;
  handleSaveOnClick?: () => void;
  handleImageLink?: (id: string, imageUrl: string | null, index?: number) => void;
  showDeactivateButton?: boolean;
  onDeactivate?: () => void;
}

const AddForm: React.FC<AddFormProps> = ({
  index,
  data,
  handleFileSelect,
  deleteImage,
  imageLinks,
  handleProductSelect,
  selectedData,
  deleteData,
  handleInputonChange,
  handleSelectonChange,
  handelCheckBoxonChange,
  onRadioChange,
  ontimeupdate,
  edit = true,
  handleLocation,
  handleRadioChange,
  handleSaveOnClick,
  handleImageLink,
  showDeactivateButton = false,
  onDeactivate,
}) => {
  return (
    <div className="grid gap-6">
      {showDeactivateButton && (
        <div className="flex justify-end">
          <button
            onClick={onDeactivate}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Deactivate
          </button>
        </div>
      )}
      {data?.map((field, i) => (
        <div className="grid gap-2" key={i}>
          {/* Label */}
          {(field?.label || field?.field_name) && (
            <label
              className={`block text-sm font-medium leading-6 ${
                field?.disabled ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {field?.label || field?.field_name}
              {field?.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Field Container */}
          <div className="w-full">
            {renderField(field, edit, {
              handleInputonChange,
              handleSelectonChange,
              handleProductSelect,
              deleteData,
              handleRadioChange,
              handleSaveOnClick,
              handleImageLink,
              index,
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to render different field types
const renderField = (field: Field, edit: boolean, handlers: any) => {
  switch (field.type) {
    case "text":
      return edit ? (
        <div>
          <TailInput
            fieldKey={field.key}
            value={field.value || ""}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            handleInputonChange={handlers.handleInputonChange}
            startIcon={field.startIcon}
            endIcon={field.endIcon}
            index={handlers.index}
            maxLength={field.maxLength}
          />
          {field.description && (
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          )}
        </div>
      ) : (
        field.value ?? "--"
      );
    case "email":
      return edit ? (
        <div>
          <TailInput
            fieldKey={field.key}
            value={field.value || ""}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            handleInputonChange={handlers.handleInputonChange}
            startIcon={field.startIcon}
            endIcon={field.endIcon}
            index={handlers.index}
            maxLength={field.maxLength}
          />
          {field.description && (
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          )}
        </div>
      ) : (
        field.value ?? "--"
      );

    case "textarea":
      return edit ? (
        <div>
          <TailTextarea
            disabled={field.disabled}
            fieldKey={field.key}
            label={field.label}
            value={field.value}
            description={field.description}
            handleInputonChange={handlers.handleInputonChange}
            index={handlers.index}
            maxLength={field.maxLength}
          />
          {field.description && (
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          )}
        </div>
      ) : (
        field.value ?? "--"
      );

    case "select":
      return edit ? (
        <TailSelect
          fieldKey={field.key}
          Data={field.options || []}
          placeholder={field.placeholder || field.label}
          value={field.value}
          handleSelectonChange={handlers.handleSelectonChange}
          index={handlers.index}
          required={field.required}
          disabled={field.disabled}
          multiple={field.multiple}
        />
      ) : (
        field.value ?? "--"
      );

    case "image":
      return (
        <ImageUpload
          id={field.key}
          value={field.value}
          label={field.label}
          handleImageLink={(id, imageUrl) => {
            handlers.handleImageLink(id, imageUrl, handlers.index);
          }}
          index={handlers.index}
          required={field.required}
          uploadText={field.uploadText}
          uploadDescription={field.uploadDescription}
          uploadBoxStyle={field.uploadBoxStyle}
        />
      );

    case "section":
      return (
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900">{field.label}</h3>
          {field.description && (
            <p className="mt-1 text-sm text-gray-500">{field.description}</p>
          )}
        </div>
      );

    case "switch":
      return (
        <div className="flex items-center justify-between">
          {/* <span className="text-sm font-medium text-gray-700">{field.label}</span> */}
          <Switch
            checked={field.value || false}
            onChange={(e) =>
              handlers.handleInputonChange(
                field.key,
                e.target.checked,
                handlers.index
              )
            }
            color="primary"
          />
        </div>
      );

    case "time":
      return (
        <div className="relative">
          <input
            type="text"
            value={field.value || ""}
            onClick={(e) => {
              const timePickerDialog = document.createElement("input");
              timePickerDialog.type = "time";
              timePickerDialog.onchange = (event) => {
                handlers.handleInputonChange(
                  field.key,
                  (event.target as HTMLInputElement).value,
                  handlers.index
                );
              };
              timePickerDialog.click();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder={field.placeholder}
            readOnly
          />
        </div>
      );

    case "custom":
      return field.component;

    case "file":
      return (
        <div className="relative">
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={(e) => handleInputonChange?.(field.key, e.target.files)}
            required={field.required}
            disabled={field.disabled}
            accept={field.accept}
          />
          {field.preview && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <img 
                src={field.preview} 
                alt="Preview" 
                className="w-8 h-8 object-cover rounded"
              />
            </div>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {field.options.map((option: any, index: number) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={field.key}
                value={option.value}
                checked={field.value === option.value}
                onChange={() => field.onChange(option.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case "date":
      return edit ? (
        <input
          type="date"
          value={field.value || ""}
          onChange={(e) =>
            handlers.handleInputonChange(
              field.key,
              e.target.value,
              handlers.index
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
        />
      ) : (
        field.value ?? "--"
      );

    default:
      return null;
  }
};

const FileUpload: React.FC<{ field: Field }> = ({ field }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className={field.uploadBoxStyle}>
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-blue-600 hover:text-blue-500">
              {field.uploadText}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              {field.uploadDescription}
            </p>
          </div>
          <input
            type="file"
            className="sr-only"
            accept={field.accept}
            onChange={(e) => {
              if (e.target.files && e.target.files[0] && field.onChange) {
                field.onChange(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CustomRadioGroup: React.FC<{ field: Field }> = ({ field }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <div className={field.radioStyle}>
        {field.options?.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={field.value === option.value}
              onChange={(e) => field.onChange?.(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddForm;
