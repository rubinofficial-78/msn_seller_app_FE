import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Image } from "@chakra-ui/image"; 
import Pagination from "./Pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to get image source
const getImageSrc = (path: string) => {
  // Implement your image source logic here
  return path;
};

interface Column {
  id: string;
  key: string | string[];
  label: string;
  type?: string;
  maxWidth?: number;
  minWidth?: number;
  join?: boolean;
  join_type?: string;
  join_type_key?: string[];
  tooltip?: string;
  tooltipKey?: string;
  image_path?: string;
  buttons?: any[];
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
}

const CustomTable: React.FC<CustomTableProps> = ({
  headCells,
  data = [],
  meta_data,
  setParams,
  pagination = true,
}) => {
  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {headCells.map((cell) => (
                <th
                  key={cell.id}
                  style={{ minWidth: cell.minWidth || 150 }}
                >
                  {cell.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headCells.map((cell) => (
                  <td
                    key={cell.id}
                    style={{ minWidth: cell.minWidth || 150 }}
                  >
                    {cell.type === "image_text" ? (
                      <div className="flex items-center">
                        {cell.image_path && (
                          <Image
                            src={getImageSrc(row[cell.image_path])}
                            alt=""
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {Array.isArray(cell.key)
                              ? row[cell.key[0]]
                              : row[cell.key]}
                          </div>
                          {cell.join && (
                            <div className="text-sm text-gray-500">
                              {moment(row[cell.key[1]]).format("DD MMM YYYY")}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : cell.type === "amount" ? (
                      <div className="text-sm text-gray-900">
                        ₹{row[cell.key as string]}
                      </div>
                    ) : cell.type === "status" ? (
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row[cell.key as string] === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {row[cell.key as string]}
                      </span>
                    ) : cell.join ? (
                      <div className="text-sm text-gray-900">
                        {Array.isArray(cell.key) 
                          ? cell.key.map(k => k.split('.').reduce((obj, key) => obj?.[key], row)).join(' / ')
                          : cell.key.split('.').reduce((obj, key) => obj?.[key], row)}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900">
                        {Array.isArray(cell.key) 
                          ? cell.key.map(k => k.split('.').reduce((obj, key) => obj?.[key], row)).join(' / ')
                          : cell.key.split('.').reduce((obj, key) => obj?.[key], row)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="pagination-wrapper">
          <Pagination data={data} setParams={setParams} meta_data={meta_data} />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
