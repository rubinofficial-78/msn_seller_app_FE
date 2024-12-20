import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

interface SubTableColumn {
  id: string;
  label: string;
  minWidth?: number;
}

interface AttributeRow {
  no: number;
  attribute: string;
  isMandatory: boolean;
  isInput: boolean;
  values: string;
  status: 'Active' | 'Inactive';
}

interface MainTableRow {
  id: string;
  categoryName: string;
  categoryCode: string;
  shortDescription: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  child_categories: SubTableRow[];
}

interface SubTableRow {
  id: number;
  no: number;
  categoryName: string;
  categoryCode: string;
  shortDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  parent_category_id: number;
}

interface AccordionTableProps {
  columns: Column[];
  subTableColumns: SubTableColumn[];
  data: MainTableRow[];
  onAddAttribute?: (categoryId: string) => void;
  onAddSubCategory?: (categoryName: string) => void;
  expandedViewTitle?: string;
  expandedViewButtonText?: string;
  onExpandedViewButtonClick?: (id: string) => void;
  onRowExpand?: (id: string) => void;
  pagination?: {
    total: number;
    page: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
  };
}

const AccordionTable: React.FC<AccordionTableProps> = ({
  columns,
  subTableColumns,
  data,
  onAddAttribute,
  onAddSubCategory,
  expandedViewTitle = "Attributes",
  expandedViewButtonText,
  onExpandedViewButtonClick,
  onRowExpand,
  pagination,
}) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const perPageOptions = [5, 10, 25, 100];

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newState = {
        ...prev,
        [id]: !prev[id]
      };
      
      if (newState[id] && onRowExpand) {
        onRowExpand(id);
      }
      
      return newState;
    });
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const totalPages = Math.ceil(pagination.total / pagination.perPage);
    const currentPage = pagination.page;

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700">Rows Per Page:</span>
          <select
            value={pagination.perPage}
            onChange={(e) => pagination.onPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-4">
            {`${(currentPage - 1) * pagination.perPage + 1}-${Math.min(
              currentPage * pagination.perPage,
              pagination.total
            )} of ${pagination.total}`}
          </span>
          <button
            onClick={() => pagination.onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => pagination.onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10"></th>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <React.Fragment key={row.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-2">
                  <button
                    onClick={() => toggleRow(row.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedRows[row.id] ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </td>
                {columns.map((column) => (
                  <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                    {row[column.id as keyof typeof row]}
                  </td>
                ))}
              </tr>
              
              {/* Expanded Section */}
              {expandedRows[row.id] && (
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className="px-8 py-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-medium">{expandedViewTitle}</h3>
                          {expandedViewButtonText && (
                            <button
                              onClick={() => onExpandedViewButtonClick?.(row.id)}
                              className="px-4 py-2 bg-[#800000] text-white rounded-lg text-sm"
                            >
                              {expandedViewButtonText}
                            </button>
                          )}
                          {onAddSubCategory && (
                            <button
                              onClick={() => onAddSubCategory(row.categoryName)}
                              className="px-4 py-2 bg-[#800000] text-white rounded-lg text-sm"
                            >
                              ADD SUB CATEGORY
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                          <tr>
                            {subTableColumns.map((column) => (
                              <th
                                key={column.id}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {row.child_categories.map((subRow, index) => (
                            <tr key={subRow.id}>
                              {subTableColumns.map((column) => (
                                <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                                  {column.renderCell ? (
                                    column.renderCell(subRow)
                                  ) : (
                                    subRow[column.id as keyof typeof subRow]
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
};

export default AccordionTable; 