import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AddForm from '../../components/AddForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIssueCategories, getIssueSubCategories, getOrderIdList, getUserDetails, raiseIssue } from '../../redux/Action/action';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/types';

interface TicketFormData {
  orderId: string;
  issueCategory: string;
  issueSubCategory: string;
  subject: string;
  description: string;
  images: string[];
}

const CreateTicket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  // Get issue categories from Redux store
  const { data: categories, loading } = useSelector((state: RootState) => state.data.issueCategories);
  const { data: userDetails, loading: userLoading } = useSelector((state: RootState) => state.data.userDetails);
  const { data: subCategories, loading: subCategoriesLoading } = useSelector(
    (state: RootState) => state.data.issueSubCategories
  );
  const { data: orderList, loading: orderListLoading } = useSelector(
    (state: RootState) => state.data.orderList
  );
  const { loading: raiseIssueLoading } = useSelector((state: RootState) => state.data.raiseIssue);

  const [formData, setFormData] = useState<TicketFormData>({
    orderId: '',
    issueCategory: '',
    issueSubCategory: '',
    subject: '',
    description: '',
    images: []
  });

  // Fetch user details and other data when component mounts
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log('Fetching user details with ID:', parsedUserData.ID);
    } else {
      console.log('No user data in localStorage');
    }
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIssueCategories());
  }, [dispatch]);

  // Fetch order list when user details are available
  useEffect(() => {
    if (userDetails?.email && userDetails?.mobile_number) {
      dispatch(getOrderIdList(userDetails.email, userDetails.mobile_number));
    }
  }, [dispatch, userDetails]);

  // Add this effect to debug user details
  useEffect(() => {
    console.log('User Details:', userDetails);
    // Also check localStorage
    const userData = localStorage.getItem('user');
    console.log('LocalStorage User Data:', userData ? JSON.parse(userData) : null);
  }, [userDetails]);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    if (key === 'issueCategory') {
      setFormData(prev => ({ ...prev, issueSubCategory: '' }));
      if (value) {
        // Add console logs to debug
        console.log('Selected value:', value);
        const selectedCategory = categories.find(cat => cat.code === value);
        console.log('Selected category:', selectedCategory);
        
        // Check if category has category property instead of parent_category
        if (selectedCategory?.category) {
          console.log('Fetching subcategories for:', selectedCategory.category);
          dispatch(getIssueSubCategories(selectedCategory.category));
        }
      }
    }
  };

  const handleImageLink = (id: string, link: string | null) => {
    if (link) {
      setFormData(prev => ({
        ...prev,
        images: link.split(',')
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const selectedCategory = categories.find(cat => cat.code === formData.issueCategory);
      
      const payload = {
        order_id: formData.orderId,
        category: selectedCategory?.category || '',
        sub_category: formData.issueSubCategory,
        description: {
          long_desc: formData.description,
          short_desc: formData.subject,
          additional_desc: {
            url: ''
          },
          images: formData.images
        }
      };

      await dispatch(raiseIssue(payload));
      navigate('/dashboard/support');
    } catch (error) {
      console.error('Failed to raise issue:', error);
      // Handle error (show error message to user)
    }
  };

  // Get selected category details
  const selectedCategory = categories.find(cat => cat.code === formData.issueCategory);

  const formFields = [
    {
      type: "select",
      key: "orderId",
      label: "Order Id",
      required: true,
      value: formData.orderId,
      options: orderList.map(order => ({
        value: order.id,
        label: `${order.id} - ${order.items.map(item => item.name).join(', ')} (₹${order.amount})`
      })),
      placeholder: "Select Order ID",
      disabled: orderListLoading
    },
    {
      type: "select",
      key: "issueCategory",
      label: "Issue Category",
      required: true,
      value: formData.issueCategory,
      options: categories.map(category => {
        console.log('Category mapping:', category); // Debug log
        return {
          value: category.code,
          label: category.display_name
        };
      }),
      placeholder: "Select Issue Category",
      disabled: loading
    },
    {
      type: "select",
      key: "issueSubCategory",
      label: "Issue Sub-Category",
      required: true,
      value: formData.issueSubCategory,
      options: subCategories.map(subCategory => ({
        value: subCategory.code,
        label: subCategory.display_name
      })),
      placeholder: "Select Issue Sub-Category",
      disabled: !formData.issueCategory || loading || subCategoriesLoading
    },
    {
      type: "text",
      key: "subject",
      label: "Subject Of Issue",
      required: true,
      value: formData.subject,
      placeholder: "Enter Subject of Issue"
    },
    {
      type: "textarea",
      key: "description",
      label: "Description Of Issue",
      required: true,
      value: formData.description,
      placeholder: "Enter Description of Issue"
    },
    {
      type: "image",
      key: "images",
      label: "Images/Files",
      value: formData.images.join(','),
      handleImageLink: handleImageLink,
      uploadText: "Upload a file",
      uploadDescription: "PNG, JPG, GIF up to 10MB",
      multiple: true
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          id="back-button-create-ticket"
          onClick={() => navigate('/dashboard/support')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft id="back-icon-create-ticket" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Create Ticket</h1>
          <p className="text-sm text-gray-500">Create a new support ticket</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        {(loading || subCategoriesLoading || orderListLoading || userLoading) ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <AddForm
            data={formFields}
            handleInputonChange={handleInputChange}
            handleSelectonChange={handleInputChange}
            handleImageLink={handleImageLink}
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <button
            id="cancel-button-create-ticket"
            onClick={() => navigate('/dashboard/support')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            id="raise-ticket-button-create-ticket"
            onClick={handleSubmit}
            disabled={loading || raiseIssueLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              loading || raiseIssueLoading
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {raiseIssueLoading ? 'Raising Ticket...' : 'Raise Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket; 