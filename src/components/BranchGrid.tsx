import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ToggleLeft, ToggleRight } from 'lucide-react';

interface BranchGridProps {
  data: any[];
  onStatusToggle: (row: any) => void;
}

const BranchGrid: React.FC<BranchGridProps> = ({ data, onStatusToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((branch) => (
        <div
          key={branch.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
              <p className="text-sm text-gray-500">{branch.parent?.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`view/${branch.id}`)}
                className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
                title="View"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => onStatusToggle(branch)}
                className={`p-1.5 rounded-full transition-colors ${
                  branch.status?.lookup_code === "ACTIVE"
                    ? "bg-green-50 text-green-600 hover:bg-green-100"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
                title={`${
                  branch.status?.lookup_code === "ACTIVE" ? "Deactivate" : "Activate"
                } Branch`}
              >
                {branch.status?.lookup_code === "ACTIVE" ? (
                  <ToggleRight size={16} />
                ) : (
                  <ToggleLeft size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Information</p>
              <p className="text-sm text-gray-900">{branch.email}</p>
              <p className="text-sm text-gray-900">{branch.mobile_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-sm text-gray-900">{branch.default_address?.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Partner Count</p>
              <p className="text-sm text-gray-900">{branch.partner_counts || 0}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created Date</p>
              <p className="text-sm text-gray-900">
                {new Date(branch.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchGrid; 