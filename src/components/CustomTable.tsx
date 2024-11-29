import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Image } from "@chakra-ui/image";
import Pagination from "./Pagination";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ToggleLeft,
  ToggleRight,
  Save,
  Copy,
  Trash2,
  Edit,
} from "lucide-react";

// Helper function to get image source
const getImageSrc = (path: string) => {
  // Implement your image source logic here
  return path;
};

export interface ColumnButton {
  label: string;
  icon: string;
  onClick: (row: any) => void;
}

export interface Column {
  id: string;
  key: string | string[];
  label: string;
  type?: 'custom' | 'status' | 'image_text' | 'amount' | 'status_toggle' | 'number';
  maxWidth?: number;
  minWidth?: number;
  join?: boolean;
  join_type?: string;
  join_type_key?: string[];
  tooltip?: string;
  tooltipKey?: string;
  image_path?: string;
  buttons?: ColumnButton[];
  func?: (row: any) => void;
  buttonLabel?: string;
  color?: string;
  startIcon?: React.ReactNode;
  symbol?: string;
  timeFormat?: boolean;
  currency?: boolean;
  gst?: boolean;
  defaultValue?: string;
  max_limit_key?: string;
  renderCell?: (row: any) => React.ReactNode;
}

interface CustomTableProps {
  headCells: Column[];
  data: any[];
  meta_data?: any;
  setParams?: (params: any) => void;
  changePriceRow?: any;
  pagination?: boolean;
  handleInputonChange?: (e: any, key: string, index: number) => void;
  dataFlex?: boolean;
  increment?: (index: number, value: number) => void;
  decrement?: (index: number, value: number) => void;
  onRowClick?: (row: any) => void;
  onStatusToggle?: (row: any) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  headCells,
  data = [],
  meta_data,
  setParams,
  pagination = true,
  onRowClick,
  onStatusToggle,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headCells.map((cell) => (
                    <th
                      key={cell.id}
                      style={{ minWidth: cell.minWidth || 150 }}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50 border-b"
                    >
                      {cell.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                  >
                    {headCells.map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        style={{ minWidth: cell.minWidth || 150 }}
                      >
                        {cell.type === 'custom' && cell.renderCell ? (
                          cell.renderCell(row)
                        ) : cell.type === 'status' ? (
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              row[cell.key as string] === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {row[cell.key as string]}
                          </span>
                        ) : cell.type === 'image_text' ? (
                          <div className="flex items-center">
                            {cell.image_path && (
                              <Image
                                src={getImageSrc(row[cell.image_path])}
                                alt=""
                                className="h-10 w-10 rounded-full mr-3"
                              />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {Array.isArray(cell.key)
                                  ? row[cell.key[0]]
                                  : row[cell.key]}
                              </div>
                              {cell.join && (
                                <div className="text-gray-500">
                                  {moment(row[cell.key[1]]).format(
                                    "DD MMM YYYY"
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : cell.type === 'amount' ? (
                          <div className="font-medium text-gray-900">
                            ₹
                            {Number(row[cell.key as string]).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </div>
                        ) : cell.type === 'status_toggle' ? (
                          <div 
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusToggle && onStatusToggle(row);
                            }}
                          >
                            <button 
                              className={`
                                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                                transition-colors duration-200 ease-in-out focus:outline-none
                                ${row[cell.key as string] === 'ACTIVE' ? 'bg-blue-600' : 'bg-gray-200'}
                              `}
                            >
                              <span
                                className={`
                                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                                  transition duration-200 ease-in-out
                                  ${row[cell.key as string] === 'ACTIVE' ? 'translate-x-5' : 'translate-x-0'}
                                `}
                              />
                            </button>
                            <span 
                              className={`
                                text-sm font-medium px-3 py-1 rounded-full
                                ${row[cell.key as string] === 'ACTIVE' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                                }
                              `}
                            >
                              {row[cell.key as string] === 'ACTIVE' ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        ) : cell.join ? (
                          <div className="text-gray-900">
                            {Array.isArray(cell.key)
                              ? cell.key
                                  .map((k) =>
                                    k
                                      .split(".")
                                      .reduce((obj, key) => obj?.[key], row)
                                  )
                                  .join(" / ")
                              : cell.key
                                  .split(".")
                                  .reduce((obj, key) => obj?.[key], row)}
                          </div>
                        ) : (
                          <div className="text-gray-900">
                            {Array.isArray(cell.key)
                              ? cell.key
                                  .map((k) =>
                                    k
                                      .split(".")
                                      .reduce((obj, key) => obj?.[key], row)
                                  )
                                  .join(" / ")
                              : cell.key
                                  .split(".")
                                  .reduce((obj, key) => obj?.[key], row)}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pagination && meta_data && (
        <div className="mt-4 flex justify-end">
          <Pagination data={data} setParams={setParams} meta_data={meta_data} />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
