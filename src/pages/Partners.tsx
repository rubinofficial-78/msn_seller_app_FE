import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, LayoutGrid, List } from "lucide-react";
import CustomTable from "../components/CustomTable";

interface Partner {
  id: number;
  partnerName: string;
  branchName: string;
  companyName: string;
  affiliateUrl: string;
  createdDate: string;
  contactInformation: {
    email: string;
    phone: string;
  };
  address: string;
  sellerCount: number;
  status: string;
}

const Partners: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Partners" },
    { id: "active", label: "Active Partners" },
    { id: "inactive", label: "Inactive Partners" },
  ];

  // Mock data - replace with API call
  const partnersData: Partner[] = [
    {
      id: 1,
      partnerName: "New Test Partner",
      branchName: "New Test Branch",
      companyName: "New Test Company",
      affiliateUrl: "affiliate.company.com",
      createdDate: "18-10-2024",
      contactInformation: {
        email: "new_partner@test.com",
        phone: "9896863423",
      },
      address: "3-44/3, gandhi nagar Chintal",
      sellerCount: 1,
      status: "Active",
    },
    // Add more mock data as needed
  ];

  const tableColumns = [
    {
      id: 'partnerName',
      key: 'partnerName',
      label: 'Partner Name',
      minWidth: 150
    },
    {
      id: 'branchName',
      key: 'branchName',
      label: 'Branch Name',
      minWidth: 150
    },
    {
      id: 'companyName',
      key: 'companyName',
      label: 'Company Name',
      minWidth: 150
    },
    {
      id: 'affiliateUrl',
      key: 'affiliateUrl',
      label: 'Affiliate URL',
      minWidth: 150
    },
    {
      id: 'createdDate',
      key: 'createdDate',
      label: 'Created Date',
      minWidth: 120
    },
    {
      id: 'contactInformation',
      key: 'contactInformation',
      label: 'Contact Information',
      type: 'custom' as const,
      minWidth: 200,
      renderCell: (row: Partner) => (
        <div>
          <div>Email: {row.contactInformation.email}</div>
          <div>Phone: {row.contactInformation.phone}</div>
        </div>
      )
    },
    {
      id: 'address',
      key: 'address',
      label: 'Address',
      minWidth: 200
    },
    {
      id: 'sellerCount',
      key: 'sellerCount',
      label: 'Seller Count',
      minWidth: 100
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      type: 'status_toggle' as const,
      minWidth: 120
    },
    {
      id: 'actions',
      key: 'actions',
      label: 'Action',
      type: 'custom' as const,
      minWidth: 100,
      renderCell: (row: Partner) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/view/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/edit/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Actions Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search Partner Name"
            className="px-4 py-2 border rounded-md text-sm"
          />
          <select className="px-4 py-2 border rounded-md text-sm">
            <option value="">Select Company</option>
            {/* Add company options */}
          </select>
          <select className="px-4 py-2 border rounded-md text-sm">
            <option value="">Select Branch</option>
            {/* Add branch options */}
          </select>
        </div>

        <button
          onClick={() => navigate("/dashboard/partners/create")}
          className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
        >
          ADD
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 flex gap-4 text-sm">
        <div>Total partners <span className="text-blue-600">30</span></div>
        <div>Active partners <span className="text-blue-600">23</span></div>
        <div>Inactive partners <span className="text-blue-600">2</span></div>
      </div>

      {/* Table */}
      <div className="mt-4">
        <CustomTable
          headCells={tableColumns}
          data={partnersData}
          pagination={true}
          meta_data={{
            total_rows: partnersData.length,
            page_no: 1,
            per_page: 10,
            totalPages: Math.ceil(partnersData.length / 10)
          }}
        />
      </div>
    </div>
  );
};

export default Partners;
