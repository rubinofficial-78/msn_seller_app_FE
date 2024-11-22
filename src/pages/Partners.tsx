import React from 'react';
import DataTable from '../components/DataTable';
import { useState } from 'react';
import { FaList, FaThLarge } from 'react-icons/fa';

interface Partner {
  name: string;
  branch: string;
  company: string;
  affiliateUrl: string;
  createdDate: string;
  contact: string;
  address: string;
  sellerCount: number;
  status: 'Active' | 'Inactive';
}

const columns: { header: string; accessor: keyof Partner }[] = [
  { header: 'Partner Name', accessor: 'name' },
  { header: 'Branch Name', accessor: 'branch' },
  { header: 'Company Name', accessor: 'company' },
  { header: 'Affiliate URL', accessor: 'affiliateUrl' },
  { header: 'Created Date', accessor: 'createdDate' },
  { header: 'Contact Information', accessor: 'contact' },
  { header: 'Address', accessor: 'address' },
  { header: 'Seller Count', accessor: 'sellerCount' },
  { header: 'Status', accessor: 'status' },
];

const data: Partner[] = [
  {
    name: 'Partner 1',
    branch: 'Branch 1',
    company: 'Tech Corp',
    affiliateUrl: 'partner1.msn.com',
    createdDate: '2024-03-01',
    contact: '+91 9876543210',
    address: 'Delhi, India',
    sellerCount: 15,
    status: 'Active',
  },
  {
    name: 'Partner 2',
    branch: 'Branch 2',
    company: 'Digital Solutions',
    affiliateUrl: 'partner2.msn.com',
    createdDate: '2024-04-01',
    contact: '+91 876543210',
    address: 'Mumbai, India',
    sellerCount: 20,
    status: 'Inactive',
  },
  {
    name: 'Partner 3',
    branch: 'Branch 3',
    company: 'Innovate Tech',
    affiliateUrl: 'partner3.msn.com',
    createdDate: '2024-05-01',
    contact: '+91 765432109',
    address: 'Bangalore, India',
    sellerCount: 25,
    status: 'Active',
  },
];

function Partners() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const companies = [...new Set(data.map(item => item.company))];
  const branches = [...new Set(data.map(item => item.branch))];

  // Calculate counts
  const totalPartners = data.length;
  const activePartners = data.filter(partner => partner.status === 'Active').length;
  const inactivePartners = data.filter(partner => partner.status === 'Inactive').length;

  const filteredData = data.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const companyMatch = !selectedCompany || item.company === selectedCompany;
    const branchMatch = !selectedBranch || item.branch === selectedBranch;
    return nameMatch && companyMatch && branchMatch;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Stats Section */}
      <div className="flex justify-end space-x-4 text-sm">
        <span>Total {totalPartners}</span>
        <span className="text-green-600">Active {activePartners}</span>
        <span className="text-red-600">Inactive {inactivePartners}</span>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <a className="border-b-2 border-blue-500 px-1 pb-4 text-sm font-medium text-blue-600">
            All Partners
          </a>
          <a className="px-1 pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            Active <span className="ml-1 text-green-600">{activePartners}</span>
          </a>
          <a className="px-1 pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
            Inactive <span className="ml-1 text-red-600">{inactivePartners}</span>
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => {/* Add partner logic */}}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          ADD
        </button>

        <div className="flex-1 flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Partner Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Company</option>
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                    {item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              {columns.map(column => (
                <div key={column.accessor} className="mb-2">
                  <span className="font-semibold">{column.header}: </span>
                  {item[column.accessor]}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Partners;