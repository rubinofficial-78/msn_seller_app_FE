import React, { useState } from 'react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import adyaLogo from '../../assests/adya.png';
import CustomTable from '../../components/CustomTable';
import AddForm from '../../components/AddForm';

interface Template {
  templateTitle: string;
  messageType: string;
  subject: string;
  createDate: string;
  status: string;
  msg91EmailTemplateId?: string;
  msg91EmailSubject?: string;
  msg91EmailDescription?: string;
  msg91SmsTemplateId?: string;
  msg91SmsDescription?: string;
}

const NotificationSettings = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [selectedMessageType, setSelectedMessageType] = useState('both');
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const navigate = useNavigate();

  // Sample template data with full details
  const templateData: Template[] = [
    {
      templateTitle: 'Order Return Request',
      messageType: 'Sms',
      subject: '',
      createDate: '14-11-2024',
      status: 'Active',
      msg91SmsTemplateId: '65cb4ee6d6fc05613071b932',
      msg91SmsDescription: 'Order return request template'
    },
    // ... other templates
  ];

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setSelectedMessageType(template.messageType.toLowerCase());
    setShowAddTemplate(true);
  };

  const handleInputChange = (key: string, value: any) => {
    if (key === 'messageType') {
      setSelectedMessageType(value);
    }
    if (editingTemplate) {
      setEditingTemplate(prev => prev ? { ...prev, [key]: value } : null);
    }
    console.log('Input changed:', key, value);
  };

  const handleSave = () => {
    // Handle save logic here
    setShowAddTemplate(false);
    setEditingTemplate(null);
    setSelectedMessageType('both');
  };

  const handleCancel = () => {
    setShowAddTemplate(false);
    setEditingTemplate(null);
    setSelectedMessageType('both');
  };

  // Update tableColumns to include edit functionality
  const tableColumns = [
    {
      id: 'templateTitle',
      key: 'templateTitle',
      label: 'Template Title',
      minWidth: 200
    },
    {
      id: 'messageType',
      key: 'messageType',
      label: 'Message Type',
      minWidth: 150
    },
    {
      id: 'subject',
      key: 'subject',
      label: 'Subject',
      minWidth: 200
    },
    {
      id: 'createDate',
      key: 'createDate',
      label: 'Create Date',
      minWidth: 150
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      type: 'status_toggle' as const,
      minWidth: 150
    },
    {
      id: 'actions',
      key: 'actions',
      label: 'Action',
      type: 'custom' as const,
      minWidth: 100,
      renderCell: (row: Template) => (
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            <Pencil size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  // Modified getFormFields to pre-fill values when editing
  const getFormFields = () => {
    const baseFields = [
      {
        type: 'text',
        key: 'templateTitle',
        label: 'Template Title',
        required: true,
        placeholder: 'Enter template title',
        value: editingTemplate?.templateTitle || ''
      },
      {
        type: 'radio',
        key: 'messageType',
        label: 'Message Type',
        required: true,
        value: selectedMessageType,
        options: [
          { label: 'Both', value: 'both' },
          { label: 'Email', value: 'email' },
          { label: 'Sms', value: 'sms' }
        ],
        radioStyle: 'flex gap-6',
        onChange: (value: string) => setSelectedMessageType(value)
      }
    ];

    const emailFields = [
      {
        type: 'text',
        key: 'msg91EmailTemplateId',
        label: 'Msg91 Email Template Id',
        required: true,
        placeholder: 'MSG91 Email Template Id',
        value: editingTemplate?.msg91EmailTemplateId || ''
      },
      {
        type: 'text',
        key: 'msg91EmailSubject',
        label: 'Msg91 Email Subject',
        required: true,
        placeholder: 'ex: Good Morning [SELLER_NAME]',
        value: editingTemplate?.msg91EmailSubject || ''
      },
      {
        type: 'textarea',
        key: 'msg91EmailDescription',
        label: 'Msg91 Email Description',
        required: true,
        placeholder: 'Enter email description',
        value: editingTemplate?.msg91EmailDescription || ''
      }
    ];

    const smsFields = [
      {
        type: 'text',
        key: 'msg91SmsTemplateId',
        label: 'Msg91 Sms Template Id',
        required: true,
        placeholder: 'ex: 65cb4ee6d6fc05613071b932',
        value: editingTemplate?.msg91SmsTemplateId || ''
      },
      {
        type: 'textarea',
        key: 'msg91SmsDescription',
        label: 'Msg91 Sms Description',
        required: true,
        placeholder: 'Enter SMS description',
        value: editingTemplate?.msg91SmsDescription || ''
      }
    ];

    // Combine fields based on selected message type
    if (selectedMessageType === 'both') {
      return [...baseFields, ...emailFields, ...smsFields];
    } else if (selectedMessageType === 'email') {
      return [...baseFields, ...emailFields];
    } else {
      return [...baseFields, ...smsFields];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          id="back-button"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Notification Settings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            id="email-configuration-button"
            onClick={() => setActiveTab('email')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'email'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Email Configuration
          </button>
          <button
            id="sms-configuration-button"
            onClick={() => setActiveTab('sms')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SMS Configuration
          </button>
          <button
            id="email-sms-templates-button"
            onClick={() => setActiveTab('templates')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Email/SMS Templates
          </button>
        </nav>
      </div>

      {/* Templates Content */}
      {activeTab === 'templates' && !showAddTemplate && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by Title"
                className="px-4 py-2 border rounded-md text-sm"
                id="search-by-title-input"
              />
              <select className="px-4 py-2 border rounded-md text-sm">
                <option value="">Message type</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
              <input
                type="date"
                className="px-4 py-2 border rounded-md text-sm"
                placeholder="dd-mm-yyyy"
              />
              <input
                id="date-input"
                type="date"
                className="px-4 py-2 border rounded-md text-sm"
                placeholder="dd-mm-yyyy"
              />
            </div>
            <button
              onClick={() => setShowAddTemplate(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
            >
              ADD TEMPLATE
            </button>
          </div>

          <CustomTable
            headCells={tableColumns}
            data={templateData}
            pagination={true}
            meta_data={{
              total_rows: templateData.length,
              page_no: 1,
              per_page: 10,
              totalPages: Math.ceil(templateData.length / 10)
            }}
          />
        </div>
      )}

      {/* Add/Edit Template Form */}
      {activeTab === 'templates' && showAddTemplate && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => handleCancel()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">
                {editingTemplate ? 'Edit Template' : 'Create Template'}
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              This template creation page is designed to assist you in crafting email and SMS notifications for your sellers. 
              Please exercise caution when entering sensitive information, as it will be visible and sent to your customers.
            </p>

            <AddForm
              data={getFormFields()}
              handleInputonChange={handleInputChange}
              handleSaveOnClick={handleSave}
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded-md text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
              >
                {editingTemplate ? 'UPDATE' : 'SAVE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other tab contents remain the same */}
      {activeTab === 'email' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Email Service provider</h2>
            <p className="text-gray-600 mb-6">
              Integrate our developer-friendly EMAIL API to send and receive text messages. 
              Our distributed carrier network and intelligent routing ensure the highest delivery and lowest latency.
            </p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={adyaLogo} alt="Adya" className="w-16 h-16" />
                    <div>
                      <div className="text-green-500 text-sm font-medium">Active Now</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">All Email Service provider</h3>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={adyaLogo} alt="Adya" className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sms' && (
        <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">SMS Service provider</h2>
            <p className="text-gray-600 mb-6">
              Integrate our developer-friendly SMS API to send and receive text messages. 
              Our distributed carrier network and intelligent routing ensure the highest delivery and lowest latency.
            </p>
            
            <div className="space-y-4">
              {/* Active Provider */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
                      <img 
                        src="/msg91-logo.png" 
                        alt="MSG91" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-green-500 text-sm font-medium">Active Now</div>
                      <div className="text-sm text-gray-600 mt-1">MSG91</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* All SMS Providers */}
              <h3 className="text-lg font-medium mt-6 mb-4">All SMS Service providers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gupshup */}
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-purple-50 rounded-lg">
                      <img 
                        src="/gupshup-logo.png" 
                        alt="Gupshup" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Gupshup</div>
                      <div className="text-sm text-gray-600 mt-1">Enterprise SMS Solutions</div>
                    </div>
                  </div>
                </div>

                {/* Kaleyra */}
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-lg">
                      <img 
                        src="/kaleyra-logo.png" 
                        alt="Kaleyra" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Kaleyra</div>
                      <div className="text-sm text-gray-600 mt-1">Global SMS Platform</div>
                    </div>
                  </div>
                </div>
              </div>
 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings; 