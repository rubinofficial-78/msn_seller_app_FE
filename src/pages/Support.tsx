import React, { useState, useEffect } from "react";
import { Download, Eye } from "lucide-react";
import CustomTable from "../components/CustomTable";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIssues, getIssueCategories, getIssueStatusLookup } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";

const Support = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const {
    data: issues,
    loading,
    meta,
  } = useSelector((state: RootState) => state.data.issues);

  const { data: categories } = useSelector((state: RootState) => state.data.issueCategories);

  const { data: issueStatusList } = useSelector((state: RootState) => state.data.issueStatusLookup);

  useEffect(() => {
    fetchIssues();
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    dispatch(getIssueCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIssueStatusLookup());
  }, [dispatch]);

  const fetchIssues = () => {
    dispatch(
      getIssues({
        page_no: currentPage,
        per_page: perPage,
        search: searchTerm,
      })
    );
  };

  const tableColumns = [
    {
      id: "ticketType",
      key: "issue.issue_type",
      label: "Ticket Type",
      minWidth: 120,
    },
    {
      id: "status",
      key: "status",
      label: "Ticket Status\nTicket ID\nNetwork Issue ID",
      type: "custom",
      minWidth: 200,
      renderCell: (row: any) => (
        <div>
          <div
            className={`inline-block px-2 py-1 rounded-md text-white text-xs ${
              row.status === "OPEN"
                ? "bg-red-500"
                : row.status === "RESOLVED"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {row.status}
          </div>
          <div className="mt-1">{row.issue_id_crm_bpp}</div>
          <div className="text-gray-500">{row.unique_issue_id}</div>
        </div>
      ),
    },
    {
      id: "orderDetails",
      key: "issue.order_details",
      label: "Order ID\nCategory",
      type: "custom",
      minWidth: 180,
      renderCell: (row: any) => (
        <div>
          <div>{row.issue.order_details.id}</div>
          <div className="text-gray-500">
            Category: {row.issue.order_details.items[0]?.category || "-"}
          </div>
        </div>
      ),
    },
    {
      id: "networkParticipants",
      key: ["buyer", "seller"],
      label: "Network Participants",
      type: "custom",
      minWidth: 200,
      renderCell: (row: any) => (
        <div>
          <div>{row.buyer}</div>
          <div>{row.seller}</div>
        </div>
      ),
    },
    {
      id: "creationDate",
      key: "createdAt",
      label: "Creation\ndate & time",
      minWidth: 150,
    },
    {
      id: "issueCategory",
      key: "issue_category",
      label: "Issue Category (L1)",
      minWidth: 150,
    },
    {
      id: "subCategory",
      key: "sub_category_name",
      label: "Issue Sub Category (L2)",
      minWidth: 180,
    },
    {
      id: "expectedResponseTime",
      key: "expected_response_timestamp",
      label: "Expected Response\ndate & time",
      minWidth: 150,
    },
    {
      id: "updatedAt",
      key: "updatedAt",
      label: "Last Update\ndate & time",
      minWidth: 150,
    },
    {
      id: "expectedResolutionTime",
      key: "expected_resolution_timestamp",
      label: "Expected Resolution\ndate & time",
      minWidth: 150,
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "actions",
      minWidth: 100,
      actions: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => navigate(`/dashboard/support/view/${row.issue_id_crm_bpp}`)
        }
      ]
    },
  ];

  const handleExportToExcel = () => {
    const exportData = issues.map((issue) => ({
      "Ticket Type": issue.issue.issue_type,
      "Ticket Status": issue.status,
      "Ticket ID": issue.issue_id_crm_bpp,
      "Network Issue ID": issue.unique_issue_id,
      "Order ID": issue.issue.order_details.id,
      Category: issue.issue.order_details.items[0]?.category,
      "Network Participants": `${issue.buyer}, ${issue.seller}`,
      "Creation Date & Time": issue.createdAt,
      "Issue Category": issue.issue_category,
      "Sub Category": issue.sub_category_name,
      "Expected Response Time": issue.expected_response_timestamp,
      "Last Update Time": issue.updatedAt,
      "Expected Resolution Time": issue.expected_resolution_timestamp,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Support Tickets");
    XLSX.writeFile(
      wb,
      `Support_Tickets_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setIssueCategory("");
    setStatus("");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
    fetchIssues();
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-4">
          <button
            id="raise-ticket-button-support"
            onClick={() => navigate("/dashboard/support/create-ticket")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            RAISE TICKET
          </button>

          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-[300px]">
              <input
                type="text"
                placeholder="Search by Network Issue Id"
                id="search-input-support"
                className="w-full px-4 py-2 border rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              id="issue-category-select-support"
              className="px-4 py-2 border rounded-md text-sm min-w-[180px]"
              value={issueCategory}
              onChange={(e) => {
                setIssueCategory(e.target.value);
                setCurrentPage(1);
                fetchIssues();
              }}
            >
              <option value="">All Issue Categories</option>
              {categories.map((category) => (
                <option key={category.code} value={category.category}>
                  {category.display_name}
                </option>
              ))}
            </select>

            <select
              id="status-select-support"
              className="px-4 py-2 border rounded-md text-sm min-w-[180px]"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
                fetchIssues();
              }}
            >
              <option value="">All Statuses</option>
              {issueStatusList.map((statusItem) => (
                <option key={statusItem.id} value={statusItem.lookup_code}>
                  {statusItem.display_name}
                </option>
              ))}
            </select>

            <input
              id="from-date-picker-support"
              type="date"
              className="px-4 py-2 border rounded-md text-sm w-[150px]"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              id="to-date-picker-support"
              type="date"
              className="px-4 py-2 border rounded-md text-sm w-[150px]"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
            <button
              onClick={handleExportToExcel}
              id="download-excel-button-support"
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Download Excel"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={tableColumns}
          data={issues}
          loading={loading}
          pagination={true}
          meta_data={meta}
          setParams={(params) => setCurrentPage(params.page_no || 1)}
          currentPage={currentPage}
        />
      </div>

      {/* No Results Message */}
      {!loading && issues.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tickets found matching the selected filters
        </div>
      )}
    </div>
  );
};

export default Support;
