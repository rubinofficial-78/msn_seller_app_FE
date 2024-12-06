import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  setParams?: (params: any) => void;
  data: any[];
  meta_data?: {
    total_rows?: number;
    page_no?: number;
    currentPage?: number;
    totalPages?: number;
    pageSize?: number;
    totalCount?: number;
    per_page?: number;
  };
}

const Pagination: React.FC<PaginationProps> = ({ setParams, data = [], meta_data }) => {
  const handlePageChange = (newPage: number) => {
    setParams?.({
      page_no: newPage,
      per_page: meta_data?.per_page || meta_data?.pageSize || 10
    });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setParams?.({
      page_no: 1,
      per_page: newSize
    });
  };

  // If no meta data, don't render pagination
  if (!meta_data) return null;

  const currentPage = meta_data.page_no || meta_data.currentPage || 1;
  const totalPages = meta_data.totalPages || 1;
  const totalItems = meta_data.total_rows || meta_data.totalCount || 0;
  const pageSize = meta_data.per_page || meta_data.pageSize || 10;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rows Per Page:</span>
        <select
          value={pageSize}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Items count and navigation */}
      <div className="flex items-center gap-4">
        {/* Items count */}
        <span className="text-sm text-gray-700">
          {startItem}-{endItem} of {totalItems}
        </span>

        {/* Navigation buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft id="previous-page-icon" size={20} />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight id="next-page-icon" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination; 