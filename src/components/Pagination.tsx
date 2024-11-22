import React, { useState } from 'react';
import { TablePagination } from '@mui/material';
import useMobileView from '../hooks/useMobileView';

interface PaginationProps {
  setParams?: (params: any) => void;
  data: any[];
  meta_data?: {
    total_rows?: number;
    page_no?: number;
  };
}

const Pagination: React.FC<PaginationProps> = ({ setParams, data = [], meta_data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobileView = useMobileView();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setParams?.((prev: any) => ({
      ...prev,
      page_no: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    setParams?.((prev: any) => ({
      ...prev,
      page_no: 1,
      per_page: parseInt(event.target.value, 10),
    }));
  };

  return (
    <div className="flex w-full justify-center items-center mt-2 rounded-lg">
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        className="flex justify-center items-center rounded-lg w-fit shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
        size="small"
        labelRowsPerPage={isMobileView ? "Per Page:" : "Rows Per Page:"}
        count={meta_data?.total_rows ?? 0}
        page={meta_data?.page_no ? meta_data.page_no - 1 : page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Pagination; 