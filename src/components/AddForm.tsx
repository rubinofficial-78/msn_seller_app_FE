import React from "react";
import {
  TextField,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
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
  handleImageLink?: (value: any) => void;
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

          {/* Field Description */}
          {field.description && (
            <p className="text-sm text-gray-500 mt-1">{field.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to render different field types
const renderField = (field: Field, edit: boolean, handlers: any) => {
  switch (field.type) {
    case "text":
    case "number":
    case "email":
      return edit ? (
        <TailInput
          disabled={field.disabled}
          fieldKey={field.key}
          label={field.label}
          value={field.value || ""}
          type={field.type}
          placeholder={field.placeholder}
          handleInputonChange={handlers.handleInputonChange}
          index={handlers.index}
          startIcon={field.startIcon}
          endIcon={field.endIcon}
        />
      ) : (
        field.value ?? "--"
      );

    case "textarea":
      return edit ? (
        <TailTextarea
          disabled={field.disabled}
          fieldKey={field.key}
          label={field.label}
          value={field.value}
          description={field.description}
          handleInputonChange={handlers.handleInputonChange}
          index={handlers.index}
        />
      ) : (
        field.value ?? "--"
      );

    case "select":
      return edit ? (
        <TailSelect
          fieldKey={field.key}
          Data={field.options || []}
          placeholder={field.label}
          value={field.value}
          handleSelectonChange={handlers.handleSelectonChange}
          index={handlers.index}
        />
      ) : (
        field.value?.label ?? "--"
      );

    case "image":
      return (
        <ImageUpload
          id={field.key}
          value={field.value}
          label={field.label}
          handleImageLink={handlers.handleImageLink}
          index={handlers.index}
          required={field.required}
        />
      );

    default:
      return null;
  }
};

export default AddForm;
