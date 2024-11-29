import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBranch, getCompanyDropdown, getBranchById } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { AppDispatch } from '../redux/store';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AddForm from '../components/AddForm';

interface FormData {
  branchName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  created_by_id: number;
}

const EditBranch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({} as FormData);

  // Get companies from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  // Fetch companies and branch details on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
    if (id) {
      fetchBranchDetails();
    }
  }, [dispatch, id]);

  const fetchBranchDetails = async () => {
    try {
      if (!id) return;
      const branchData = await dispatch(getBranchById(parseInt(id)));
      
      // Find the company name from companies list
      const selectedCompany = companies.find(
        company => company.id.toString() === branchData.created_by_id?.toString()
      );

      setFormData({
        branchName: branchData.name || '',
        companyName: selectedCompany?.name || '', // Store company name instead of ID
        email: branchData.email || '',
        mobileNumber: branchData.mobile_number || '',
        address: branchData.default_address?.address || '',
        state: branchData.default_address?.state || '',
        city: branchData.default_address?.city || '',
        pincode: branchData.default_address?.pincode || '',
        created_by_id: branchData.created_by_id // Store the ID separately
      });
    } catch (error) {
      console.error('Error fetching branch details:', error);
      toast.error('Failed to fetch branch details');
    }
  };

  const handleInputChange = (key: string, value: any) => {
    if (key === 'companyName') {
      const actualValue = typeof value === 'object' ? value.value : value;
      console.log('Company Selection:', { value, actualValue });
      setFormData(prev => ({ ...prev, [key]: actualValue }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!id) {
        toast.error('Branch ID is missing');
        return;
      }

      if (!formData.branchName || !formData.email || !formData.mobileNumber) {
        toast.error('Please fill all required fields');
        return;
      }

      const payload = {
        name: formData.branchName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        created_by_id: formData.created_by_id, // Use the stored ID
        default_address: {
          address: formData.address || '',
          state: formData.state || '',
          city: formData.city || '',
          pincode: formData.pincode || ''
        }
      };

      console.log('Submitting payload:', payload);

      const response = await dispatch(updateBranch(parseInt(id), payload));
      
      if (response?.meta?.status) {
        toast.success('Branch updated successfully');
        navigate(-1);
      } else {
        toast.error(response?.meta?.message || 'Failed to update branch');
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update branch: ${errorMessage}`);
    }
  };

  const formFields = [
    {
      type: 'text', // Changed from select to text
      key: 'companyName',
      label: 'Company Name',
      required: true,
      value: formData.companyName,
      disabled: true, // Make it read-only
      placeholder: 'Company Name'
    },
    {
      type: 'text',
      key: 'branchName',
      label: 'Branch Name',
      required: true,
      value: formData.branchName,
      placeholder: 'Enter Branch Name'
    },
    {
      type: 'email',
      key: 'email',
      label: 'Email',
      required: true,
      value: formData.email,
      placeholder: 'Enter Email'
    },
    {
      type: 'text',
      key: 'mobileNumber',
      label: 'Mobile Number',
      required: true,
      value: formData.mobileNumber,
      placeholder: 'Enter Mobile Number'
    },
    {
      type: 'textarea',
      key: 'address',
      label: 'Address',
      required: true,
      value: formData.address,
      placeholder: 'Enter Address'
    },
    {
      type: 'text',
      key: 'state',
      label: 'State',
      required: true,
      value: formData.state,
      placeholder: 'Enter State'
    },
    {
      type: 'text',
      key: 'city',
      label: 'City',
      required: true,
      value: formData.city,
      placeholder: 'Enter City'
    },
    {
      type: 'text',
      key: 'pincode',
      label: 'Pincode',
      required: true,
      value: formData.pincode,
      placeholder: 'Enter Pincode'
    }
  ];

  useEffect(() => {
    console.log('Current Form Data:', formData);
    console.log('Available Companies:', companies);
  }, [formData, companies]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Edit Branch</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg p-6">
        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBranch;