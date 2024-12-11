import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const ViewTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isNetworkIssue, setIsNetworkIssue] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/support')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">TICKETS</h1>
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">{id}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          ASSIGN TO SELLER
        </button>
      </div>

      {/* Network/Internal Toggle */}
      <div className="bg-gray-100 p-1 rounded-lg inline-flex gap-1">
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            isNetworkIssue 
              ? 'bg-white shadow text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setIsNetworkIssue(true)}
        >
          ON NETWORK ISSUE
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm ${
            !isNetworkIssue 
              ? 'bg-white shadow text-gray-900' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setIsNetworkIssue(false)}
        >
          INTERNAL ISSUE
        </button>
      </div>

      {/* Source Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-purple-600 mb-6">Source information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ticket ID</label>
              <div className="mt-1 text-gray-900">{id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order ID</label>
              <div className="mt-1 text-gray-900">2024-8691-28595</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Issue ID</label>
              <div className="mt-1 text-gray-900">NI-0001</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Source</label>
              <div className="mt-1 text-gray-900">preprod.ondc.adya.ai</div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <div className="mt-1 text-gray-900">Over paid</div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Long Description</label>
              <div className="mt-1 text-gray-900">
                I am raising a concern regarding order ID 2024-8691-28595...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-6">Issue Category</h2>
        <div className="text-gray-900">FULFILLMENT</div>
      </div>

      {/* Network Participants */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-purple-600 mb-6">Network Participants</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Buyer Application Name</label>
            <div className="mt-1 text-gray-900">preprod-ondc.letsbho.in</div>
          </div>
        </div>
      </div>

      {/* Assign to Seller Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Assign to Seller</h2>
            {/* Add seller assignment form here */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle assignment
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTicket; 