import React from 'react';
import { Eye, Edit } from 'lucide-react';

interface SellerGridProps {
  data: any[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}

const SellerGrid = ({ data, onView, onEdit }: SellerGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((seller) => (
        <div key={seller.id} className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{seller.name}</h3>
              <p className="text-sm text-gray-600">{seller.store_details?.[0]?.name || '-'}</p>
            </div>
            
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-500">Contact Info</label>
                <p className="text-sm">{seller.email}<br/>{seller.mobile_number}</p>
              </div>
              
              <div>
                <label className="text-xs text-gray-500">GST No</label>
                <p className="text-sm">{seller.gstin || '-'}</p>
              </div>
              
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  seller.status?.display_name === 'APPROVED' ? 'bg-green-100 text-green-800' :
                  seller.status?.display_name === 'PENDING' ? 'bg-gray-100 text-gray-800' :
                  seller.status?.display_name === 'REJECTED' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {seller.status?.display_name || 'Not Available'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                id="view-button-seller"
                onClick={() => onView(seller.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="View"
              >
                <Eye size={18} />
              </button>
              <button
                id="edit-button-seller"
                onClick={() => onEdit(seller.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Edit"
              >
                <Edit size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerGrid; 