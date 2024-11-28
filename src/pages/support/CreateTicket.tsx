import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AddForm from '../../components/AddForm';

interface TicketFormData {
  orderId: string;
  issueCategory: string;
  issueSubCategory: string;
  subject: string;
  description: string;
  images: string[];
}

const ISSUE_CATEGORIES = {
  'order': ['Delivery Delay', 'Wrong Item', 'Missing Item', 'Damaged Item'],
  'payment': ['Refund', 'Overcharged', 'Payment Failed', 'Double Payment'],
  'fulfillment': ['Order Not Accepted', 'Order Preparation Delay', 'Packaging Issue'],
  'return': ['Return Request', 'Return Pickup', 'Return Refund'],
  'agent': ['Agent Behavior', 'Agent Response Delay', 'Wrong Information'],
  'item': ['Quality Issue', 'Quantity Issue', 'Price Mismatch', 'Item Description Mismatch']
};

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TicketFormData>({
    orderId: '',
    issueCategory: '',
    issueSubCategory: '',
    subject: '',
    description: '',
    images: []
  });

  const [subCategories, setSubCategories] = useState<string[]>([]);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));

    // Update sub-categories when category changes
    if (key === 'issueCategory') {
      setSubCategories(ISSUE_CATEGORIES[value as keyof typeof ISSUE_CATEGORIES] || []);
      setFormData(prev => ({ ...prev, issueSubCategory: '' }));
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

  const handleSubmit = () => {
    console.log('Submit ticket:', formData);
    navigate('/dashboard/support');
  };

  const formFields = [
    {
      type: "text",
      key: "orderId",
      label: "Order Id",
      required: true,
      value: formData.orderId,
      placeholder: "Enter Order ID"
    },
    {
      type: "select",
      key: "issueCategory",
      label: "Issue Category",
      required: true,
      value: formData.issueCategory,
      options: Object.keys(ISSUE_CATEGORIES).map(category => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1)
      })),
      placeholder: "Select Issue Category"
    },
    {
      type: "select",
      key: "issueSubCategory",
      label: "Issue Sub-Category",
      required: true,
      value: formData.issueSubCategory,
      options: subCategories.map(subCategory => ({
        value: subCategory,
        label: subCategory
      })),
      placeholder: "Select Issue Sub-Category",
      disabled: !formData.issueCategory
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
          onClick={() => navigate('/dashboard/support')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Create Ticket</h1>
          <p className="text-sm text-gray-500">Create a new support ticket</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
          handleImageLink={handleImageLink}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <button
            onClick={() => navigate('/dashboard/support')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Raise Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket; 