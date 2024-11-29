import React from 'react';
import { Eye, Edit, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyGridProps {
  data: any[];
}

const CompanyGrid: React.FC<CompanyGridProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleView = (id: number) => {
    navigate(`view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((company) => (
        <div key={company.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Company Header */}
          <div className="p-4 bg-blue-50 border-b">
            <h3 className="font-medium text-lg text-blue-900">{company.companyName}</h3>
            <p className="text-sm text-blue-600">{company.whiteLabeledUrl}</p>
          </div>

          {/* Company Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <p className="text-sm">{company.address || 'No address provided'}</p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <p className="text-sm">{company.contactInformation.email}</p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={18} />
              <p className="text-sm">{company.contactInformation.phone}</p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <p className="text-sm">{company.createdDate}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Branches</p>
                <p className="text-lg font-semibold text-blue-600">{company.branchCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-lg font-semibold text-blue-600">{company.systemUsersCount}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${company.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {company.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
            <button
              onClick={() => handleView(company.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              <Eye size={16} />
              View
            </button>
            <button
              onClick={() => handleEdit(company.id)}
              className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded"
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid; 