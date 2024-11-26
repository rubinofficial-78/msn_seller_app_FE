import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, LayoutGrid, List } from "lucide-react";

const Partners: React.FC = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Partners" },
    { id: "active", label: "Active Partners" },
    { id: "inactive", label: "Inactive Partners" },
  ];

  // Mock data - replace with API call
  const partnersData = [
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
  ];

  const renderGridView = () => (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partnersData.map((partner) => (
        <div
          key={partner.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          {/* Header with Actions */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg">{partner.partnerName}</h3>
              <p className="text-sm text-gray-500">{partner.branchName}</p>
              <p className="text-sm text-gray-500">{partner.companyName}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`view/${partner.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => navigate(`edit/${partner.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Edit size={18} />
              </button>
            </div>
          </div>

          {/* Partner Details */}
          <div className="space-y-3">
            {/* Affiliate URL */}
            <div>
              <label className="text-xs text-gray-500">Affiliate URL</label>
              <p className="text-sm">{partner.affiliateUrl}</p>
            </div>

            {/* Created Date */}
            <div>
              <label className="text-xs text-gray-500">Created Date</label>
              <p className="text-sm">{partner.createdDate}</p>
            </div>

            {/* Contact Information */}
            <div>
              <label className="text-xs text-gray-500">
                Contact Information
              </label>
              <p className="text-sm">
                Email: {partner.contactInformation.email}
              </p>
              <p className="text-sm">
                Phone: {partner.contactInformation.phone}
              </p>
            </div>

            {/* Address */}
            <div>
              <label className="text-xs text-gray-500">Address</label>
              <p className="text-sm">{partner.address}</p>
            </div>

            {/* Seller Count */}
            <div>
              <label className="text-xs text-gray-500">Seller Count</label>
              <p className="text-sm">{partner.sellerCount}</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-500">Status</label>
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={partner.status === "Active"}
                    onChange={() => {
                      /* Handle status toggle */
                    }}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    partner.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {partner.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Partner Name"
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            {/* Search icon */}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded ${
              viewType === "list" ? "bg-blue-50 text-blue-600" : "text-gray-400"
            }`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid" ? "bg-blue-50 text-blue-600" : "text-gray-400"
            }`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => navigate("/dashboard/partners/create")}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + ADD
          </button>
        </div>
      </div>

      {/* Content based on view type */}
      {viewType === "list" ? (
        <div className="mt-4 bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Partner Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Branch Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Affiliate URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Seller Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partnersData.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{partner.partnerName}</td>
                  <td className="px-6 py-4">{partner.branchName}</td>
                  <td className="px-6 py-4">{partner.companyName}</td>
                  <td className="px-6 py-4">{partner.affiliateUrl}</td>
                  <td className="px-6 py-4">{partner.createdDate}</td>
                  <td className="px-6 py-4">
                    <div>Email: {partner.contactInformation.email}</div>
                    <div>Phone: {partner.contactInformation.phone}</div>
                  </td>
                  <td className="px-6 py-4">{partner.address}</td>
                  <td className="px-6 py-4">{partner.sellerCount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={partner.status === "Active"}
                          onChange={() => {
                            /* Handle status toggle */
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          partner.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {partner.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Eye
                        className="w-5 h-5 text-blue-600 cursor-pointer"
                        onClick={() => navigate(`view/${partner.id}`)}
                      />
                      <Edit
                        className="w-5 h-5 text-blue-600 cursor-pointer"
                        onClick={() => navigate(`edit/${partner.id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        renderGridView()
      )}
    </div>
  );
};

export default Partners;
