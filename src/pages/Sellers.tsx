import React, { useState, useEffect, useRef } from 'react';
import DataTable from '../components/DataTable';
import { ListIcon, GridIcon } from '../components/Icons';
import { useNavigate } from 'react-router-dom';
import { List, LayoutGrid, Eye, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/table.css';
import CustomTable from '../components/CustomTable';

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
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const tableRef = useRef<HTMLDivElement>(null);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const currentRef = tableRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Sellers' },
    { id: 'active', label: 'Active Sellers' },
    { id: 'inactive', label: 'Inactive Sellers' }
  ];

  // Mock data - replace with API call
  const sellersData = [
    {
      id: 1,
      sellerName: 'Test Seller',
      storeName: 'Test Store',
      contactInformation: {
        email: 'seller@test.com',
        phone: '9876543210'
      },
      address: '45, MG Road, Koramangala, Bengaluru - Karnataka 560001',
      gstNo: '29GGGGG1314R9Z7',
      productCounts: 150,
      ondcLiveDate: '23-09-2024, 04:30 pm',
      sellerOnboardingDate: '23-09-2024, 04:30 pm',
      sellerActivationDate: '24-09-2024, 01:33 pm',
      sellerApprovalDate: '24-09-2024, 01:33 pm',
      catalogStatus: 'APPROVED',
      companyStatus: 'ACTIVE',
      storeStatus: 'APPROVED',
      partnerName: 'Test Partner',
      branchName: 'Test Branch',
      companyName: 'Test Company'
    }
  ];

  const columns = [
    { id: 'sellerName', key: 'sellerName', label: 'Seller Name', minWidth: 150 },
    { id: 'storeName', key: 'storeName', label: 'Store Name', minWidth: 150 },
    { 
      id: 'contactInfo', 
      key: ['contactInformation.email', 'contactInformation.phone'], 
      label: 'Contact Information',
      join: true,
      minWidth: 200 
    },
    { id: 'address', key: 'address', label: 'Address', minWidth: 250 },
    { id: 'gstNo', key: 'gstNo', label: 'GST No', minWidth: 150 },
    { id: 'productCount', key: 'productCounts', label: 'Product Counts', minWidth: 130 },
    { id: 'ondcLiveDate', key: 'ondcLiveDate', label: 'ONDC Live Date', minWidth: 180 },
    { id: 'onboardingDate', key: 'sellerOnboardingDate', label: 'Seller Onboarding Date', minWidth: 180 },
    { id: 'activationDate', key: 'sellerActivationDate', label: 'Seller Activation Date', minWidth: 180 },
    { id: 'approvalDate', key: 'sellerApprovalDate', label: 'Seller Approval Date', minWidth: 180 },
    { id: 'catalogStatus', key: 'catalogStatus', label: 'Catalog Status', type: 'status', minWidth: 130 },
    { id: 'companyStatus', key: 'companyStatus', label: 'Company Status', type: 'status', minWidth: 130 },
    { id: 'storeStatus', key: 'storeStatus', label: 'Store Status (ONDC)', type: 'status', minWidth: 150 },
    { id: 'partnerName', key: 'partnerName', label: 'Partner Name', minWidth: 150 },
    { id: 'branchName', key: 'branchName', label: 'Branch Name', minWidth: 150 },
    { id: 'companyName', key: 'companyName', label: 'Company Name', minWidth: 150 }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
            placeholder="Search by Seller Name"
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewType('list')}
            className={`p-2 rounded ${viewType === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 rounded ${viewType === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => navigate('/dashboard/sellers/add')}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + ADD
          </button>
        </div>
      </div>

      {/* Table Container */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-y-auto">
          {sellersData.map((seller, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium">{seller.sellerName}</h3>
              <p className="text-sm text-gray-600">{seller.storeName}</p>
              <div className="mt-2 text-sm">
                <p>{seller.contactInformation.email}</p>
                <p>{seller.contactInformation.phone}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 mt-4 table-wrapper">
          <CustomTable 
            headCells={columns}
            data={sellersData}
            pagination={true}
          />
        </div>
      )}
    </div>
  );
}

export default Sellers;