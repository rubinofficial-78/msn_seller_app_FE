import React, { useState } from "react";
import {
  Search,
  Plus,
  ExternalLink,
  LayoutList,
  LayoutGrid,
  Table,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { companyData } from "./Companies"; // Import company data for dropdown
import { Dialog } from "@headlessui/react"; // Add this import
import AddForm from '../components/AddForm';

// Sample data for branches
const branchData = [
  {
    branchName: "New Test Branch",
    companyName: "New Test Company",
    createdDate: "18-10-2024",
    contactInformation: {
      email: "new_branch@tmail.in",
      phone: "9459592835",
    },
    address: "3-44/3, gandhi nagar Chintal",
    partnerCount: 1,
    status: "Active",
  },
  {
    branchName: "Test role branch",
    companyName: "Role company",
    createdDate: "16-10-2024",
    contactInformation: {
      email: "role_branch@tmail.in",
      phone: "9871476540",
    },
    address: "hyderabad",
    partnerCount: 1,
    status: "Active",
  },
  // Add more sample data as needed
];

// Tab type definition
interface Tab {
  label: string;
}

const tabs: Tab[] = [
  { label: "All Branches" },
  { label: "Active Branches" },
  { label: "Inactive Branches" },
];

interface BranchTableProps {
  data: typeof branchData;
}

const BranchTable: React.FC<BranchTableProps> = ({ data }) => (
  <div className="h-[calc(100vh-280px)] flex flex-col bg-white rounded-lg shadow">
    {/* Table Header - Fixed */}
    <div className="bg-blue-50">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Branch name
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company Name
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Information
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Partner Count
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
      </table>
    </div>

    {/* Table Body - Scrollable */}
    <div className="flex-1 overflow-auto">
      <table className="min-w-full">
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((branch, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {branch.branchName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {branch.companyName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {branch.createdDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div>
                  <div className="text-gray-900">
                    Email: {branch.contactInformation.email}
                  </div>
                  <div className="text-gray-900">
                    Phone: {branch.contactInformation.phone}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {branch.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                <a href="#" className="flex items-center gap-1">
                  {branch.partnerCount}
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    branch.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {branch.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <button
                    title="View"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    title="Edit"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BranchGrid: React.FC<BranchTableProps> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((branch, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {branch.branchName}
            </p>
            <p className="text-xs text-gray-500">{branch.createdDate}</p>
          </div>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
            ${
              branch.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {branch.status}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Company</p>
            <p className="text-sm text-gray-900">{branch.companyName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Contact Information</p>
            <div className="flex items-center gap-2 text-sm text-gray-900">
              <Mail size={14} className="text-gray-500" />
              <p>{branch.contactInformation.email}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-900">
              <Phone size={14} className="text-gray-500" />
              <p>{branch.contactInformation.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{branch.address}</p>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Partners</p>
              <a
                href="#"
                className="text-sm text-blue-600 flex items-center gap-1"
              >
                {branch.partnerCount}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const BranchList: React.FC<BranchTableProps> = ({ data }) => (
  <div className="space-y-3">
    {data.map((branch, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-900">
                {branch.branchName}
              </p>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${
                  branch.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {branch.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">{branch.createdDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <button title="View" className="text-blue-600 hover:text-blue-800">
              <Eye size={16} />
            </button>
            <button title="Edit" className="text-blue-600 hover:text-blue-800">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Company</p>
            <p className="text-sm text-gray-900">{branch.companyName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Contact Information</p>
            <div className="text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-500" />
                <p>{branch.contactInformation.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-500" />
                <p>{branch.contactInformation.phone}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{branch.address}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Add this interface
interface BranchFormData {
  companyName: string;
  branchName: string;
  mobileNumber: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
}

const branchFormFields = [
  {
    type: 'select',
    key: 'companyName',
    label: 'Company Name',
    required: true,
    options: companyData.map((company, index) => ({
      id: index,
      label: company.companyName,
      value: company.companyName
    })),
    value: formData.companyName
  },
  {
    type: 'text',
    key: 'branchName',
    label: 'Branch Name',
    required: true,
    placeholder: 'Enter branch name',
    value: formData.branchName
  },
  {
    type: 'text',
    key: 'mobileNumber',
    label: 'Mobile Number',
    required: true,
    placeholder: 'Enter mobile number',
    value: formData.mobileNumber
  },
  {
    type: 'email',
    key: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter email address'
  },
  {
    type: 'textarea',
    key: 'address',
    label: 'Address',
    required: true,
    placeholder: 'Enter complete address'
  },
  {
    type: 'text',
    key: 'state',
    label: 'State',
    required: true,
    placeholder: 'Enter state'
  },
  {
    type: 'text',
    key: 'city',
    label: 'City',
    required: true,
    placeholder: 'Enter city'
  },
  {
    type: 'text',
    key: 'pincode',
    label: 'Pincode',
    required: true,
    placeholder: 'Enter pincode'
  }
];

const Branches = () => {
  const [activeTab, setActiveTab] = useState("All Branches");
  const [viewMode, setViewMode] = useState<"table" | "list" | "grid">("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<BranchFormData>({
    companyName: "",
    branchName: "",
    mobileNumber: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    setIsModalOpen(false);
  };

  const renderBranches = () => {
    switch (viewMode) {
      case "grid":
        return <BranchGrid data={branchData} />;
      case "list":
        return <BranchList data={branchData} />;
      default:
        return <BranchTable data={branchData} />;
    }
  };

  const handleInputonChange = (key: string, value: string, index?: number) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectonChange = (key: string, value: any, index?: number) => {
    setFormData(prev => ({
      ...prev,
      [key]: value.value
    }));
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.label
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Partner Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Company Select */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Select Company</option>
            {companyData.map((company, index) => (
              <option key={index} value={company.companyName}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* View Controls and Add Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="List view"
          >
            <LayoutList size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Table view"
          >
            <Table size={20} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Render Branches based on view mode */}
      {renderBranches()}

      {/* Add this modal component before the final closing div */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add New Branch</h2>

            <AddForm
              data={branchFormFields}
              handleInputonChange={handleInputonChange}
              handleSelectonChange={handleSelectonChange}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Branches;
