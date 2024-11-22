import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { ListIcon, GridIcon } from '../components/Icons';

interface Seller {
  sellerName: string;
  storeName: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  address: string;
  gstNo: string;
  productCount: number;
  ondcLiveDate: string;
  onboardingDate: string;
  activationDate: string;
  approvalDate: string;
  catalogStatus: 'Active' | 'Inactive';
  companyStatus: 'Active' | 'Inactive';
  storeStatus: 'Live' | 'Inactive';
  partnerName: string;
  branchName: string;
  companyName: string;
  status: 'PENDING' | 'REJECTED' | 'APPROVED';
}

const columns: { header: string; accessor: keyof Seller | string }[] = [
  { header: 'Seller Name', accessor: 'sellerName' },
  { header: 'Store Name', accessor: 'storeName' },
  { header: 'Contact Information', accessor: 'contactInfo' },
  { header: 'Address', accessor: 'address' },
  { header: 'GST No', accessor: 'gstNo' },
  { header: 'Product Counts', accessor: 'productCount' },
  { header: 'ONDC Live Date', accessor: 'ondcLiveDate' },
  { header: 'Seller Onboarding Date', accessor: 'onboardingDate' },
  { header: 'Seller Activation Date', accessor: 'activationDate' },
  { header: 'Seller Approval Date', accessor: 'approvalDate' },
  { header: 'Catalog Status', accessor: 'catalogStatus' },
  { header: 'Company Status', accessor: 'companyStatus' },
  { header: 'Store Status (ONDC)', accessor: 'storeStatus' },
  { header: 'Partner Name', accessor: 'partnerName' },
  { header: 'Branch Name', accessor: 'branchName' },
  { header: 'Company Name', accessor: 'companyName' },
  { header: 'Action', accessor: 'action' },
];

const sampleData: Seller[] = [
  {
    sellerName: 'Test Seller',
    storeName: 'Test Store',
    contactInfo: {
      email: 'test@example.com',
      phone: '1234567890'
    },
    address: 'Test Address',
    gstNo: 'GST123456',
    productCount: 10,
    ondcLiveDate: '2024-03-15',
    onboardingDate: '2024-03-01',
    activationDate: '2024-03-10',
    approvalDate: '2024-03-05',
    catalogStatus: 'Active',
    companyStatus: 'Active',
    storeStatus: 'Live',
    partnerName: 'Test Partner',
    branchName: 'Test Branch',
    companyName: 'Test Company',
    status: 'APPROVED'
  },
  // Add more sample entries as needed
];

function Sellers() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [error, setError] = useState<string | null>(null);

  // Use the sample data for now
  const data = sampleData;

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4">Loading...</div>;
  }

  // Calculate counts
  const totalSellers = data.length;
  const pendingSellers = data.filter(seller => seller.status === 'PENDING').length;
  const approvedSellers = data.filter(seller => seller.status === 'APPROVED').length;
  const rejectedSellers = data.filter(seller => seller.status === 'REJECTED').length;

  return (
    <div className="h-full flex flex-col">
      {/* Stats Section - Fixed */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-end space-x-4 text-sm">
          <span>Total Sellers {totalSellers}</span>
          <span className="text-yellow-600">Pending {pendingSellers}</span>
          <span className="text-green-600">Approved {approvedSellers}</span>
          <span className="text-red-600">Rejected {rejectedSellers}</span>
        </div>
      </div>

      {/* Filter Tabs - Fixed */}
      <div className="bg-white border-b">
        <nav className="flex space-x-8 px-4">
          <a className="border-b-2 border-blue-500 px-1 pb-4 text-sm font-medium text-blue-600">
            All Sellers
          </a>
          {['Approved', 'Pending', 'Rejected'].map((tab) => (
            <a key={tab} className="px-1 pb-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer">
              {tab} Sellers
            </a>
          ))}
        </nav>
      </div>

      {/* Controls Section - Fixed */}
      <div className="p-4 bg-white border-b">
        <div className="flex flex-wrap gap-4 items-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Seller
          </button>

          <input
            type="text"
            placeholder="Search by seller name"
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Select Company</option>
            {/* Add company options */}
          </select>

          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
          >
            <option value="">Select Partner</option>
            {/* Add partner options */}
          </select>

          <select 
            className="px-4 py-2 border rounded-md"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {/* Add branch options */}
          </select>

          <div className="flex gap-2 ml-auto">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              <ListIcon />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              <GridIcon />
            </button>
          </div>
        </div>

      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === 'list' ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Grid view cards */}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4 bg-white p-4 border-t">
          <div className="flex justify-between items-center">
            <div>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalSellers)} of {totalSellers} entries
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 border rounded-md"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-1 border rounded-md"
                disabled={currentPage * itemsPerPage >= totalSellers}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sellers;