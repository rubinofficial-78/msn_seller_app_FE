import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBranch, getCompanyDropdown } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import AddForm from "./AddForm";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

interface BranchFormData {
  companyName: string | { value: number; label: string };
  branchName: string;
  mobileNumber: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
}

const CreateBranch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<BranchFormData>({} as BranchFormData);

  // Get companies from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  useEffect(() => {
    dispatch(getCompanyDropdown());
  }, [dispatch]);

  const handleInputChange = (key: string, value: any) => {
    if (key === 'companyName') {
      console.log('Select value received:', value);
      setFormData(prev => ({
        ...prev,
        [key]: value // Store the entire object for select
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.companyName || !formData.branchName || !formData.email || !formData.mobileNumber) {
        toast.error('Please fill all required fields');
        return;
      }

      const companyId = typeof formData.companyName === 'object' 
        ? formData.companyName.value 
        : formData.companyName;

      const payload = {
        name: formData.branchName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        created_by_id: Number(companyId),
        default_address: {
          address: formData.address || '',
          state: formData.state || '',
          city: formData.city || '',
          pincode: formData.pincode || ''
        }
      };

      console.log('Creating branch with payload:', payload);

      const response = await dispatch(createBranch(payload));
      
      if (response?.meta?.status) {
        toast.success('Branch created successfully');
        navigate(-1);
      } else {
        toast.error(response?.meta?.message || 'Failed to create branch');
      }
    } catch (error) {
      console.error('Error creating branch:', error);
      toast.error('Failed to create branch: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const formFields = [
    {
      title: 'Company Branch Basics Details',
      description: 'This information represents branch basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          required: true,
          value: formData.companyName || '',
          placeholder: 'Select Company',
          options: [
            { value: '', label: 'Select Company' },
            ...companies
              .filter(company => company.is_active)
              .map(company => ({
                value: company.id,
                label: company.name
              }))
          ]
        },
        {
          type: "text",
          key: "branchName",
          label: "Branch Name",
          required: true,
          value: formData.branchName,
          placeholder: "Enter Branch Name",
        },
        {
          type: "text",
          key: "mobileNumber",
          label: "Mobile Number",
          required: true,
          value: formData.mobileNumber,
          placeholder: "Enter Mobile Number",
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          required: true,
          value: formData.email,
          placeholder: "Enter Email",
        },
        {
          type: "textarea",
          key: "address",
          label: "Address",
          required: true,
          value: formData.address,
          placeholder: "Enter Address",
        },
        {
          type: "text",
          key: "state",
          label: "State",
          required: true,
          value: formData.state,
          placeholder: "Enter State",
        },
        {
          type: "text",
          key: "city",
          label: "City",
          required: true,
          value: formData.city,
          placeholder: "Enter City",
        },
        {
          type: "text",
          key: "pincode",
          label: "Pincode",
          required: true,
          value: formData.pincode,
          placeholder: "Enter Pincode",
        },
      ]
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Create Branch</h1>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6">
        <AddForm
          data={formFields[0].fields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-opacity-90"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CreateBranch;
