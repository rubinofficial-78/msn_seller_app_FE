import React, { useState, useEffect } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import AddForm from "../../components/AddForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailSettings,
  activateEmailProvider,
  updateEmailProvider,
  getMessageTypes,
  getTemplates,
} from "../../redux/Action/action";
import { RootState } from "../../redux/types";

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

const EmailAndSmsSettings = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [selectedMessageType, setSelectedMessageType] = useState("both");
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [settingType, setSettingType] = useState<"EMAIL" | "SMS">("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailSettings = useSelector(
    (state: RootState) => state.data.emailSettings
  );
  const activateProviderStatus = useSelector(
    (state: RootState) => state.data.activateEmailProvider
  );
  const messageTypes = useSelector((state: RootState) => state.data.messageTypes);
  const templates = useSelector((state: RootState) => state.data.templates);

  useEffect(() => {
    if (activeTab === "email") {
      setSettingType("EMAIL");
      dispatch(getEmailSettings("EMAIL"));
    } else if (activeTab === "sms") {
      setSettingType("SMS");
      dispatch(getEmailSettings("SMS"));
    } else if (activeTab === "templates") {
      dispatch(getMessageTypes());
      dispatch(getTemplates());
    }
  }, [activeTab, dispatch]);

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setSelectedMessageType(template.messageType.toLowerCase());
    setShowAddTemplate(true);
  };

  const handleInputChange = (key: string, value: any) => {
    if (key === "messageType") {
      setSelectedMessageType(value);
    }
    if (editingTemplate) {
      setEditingTemplate((prev) => (prev ? { ...prev, [key]: value } : null));
    }
    console.log("Input changed:", key, value);
  };

  const handleSave = () => {
    // Handle save logic here
    setShowAddTemplate(false);
    setEditingTemplate(null);
    setSelectedMessageType("both");
  };

  const handleCancel = () => {
    setShowAddTemplate(false);
    setEditingTemplate(null);
    setSelectedMessageType("both");
  };

  // Add this hardcoded data
  const templateData: Template[] = [
    {
      templateTitle: "Order Return Request",
      messageType: "Sms",
      subject: "Return Request Confirmation",
      createDate: "14-11-2024",
      status: "Active",
      msg91SmsTemplateId: "65cb4ee6d6fc05613071b932",
      msg91SmsDescription: "Order return request template",
    },
    {
      templateTitle: "Order Confirmation",
      messageType: "Email",
      subject: "Your Order is Confirmed",
      createDate: "15-11-2024",
      status: "Active",
      msg91EmailTemplateId: "65cb4ee6d6fc05613071b933",
      msg91EmailSubject: "Order Confirmation",
      msg91EmailDescription: "Thank you for your order",
    },
    {
      templateTitle: "Welcome Message",
      messageType: "Both",
      subject: "Welcome to Our Platform",
      createDate: "16-11-2024",
      status: "Inactive",
      msg91EmailTemplateId: "65cb4ee6d6fc05613071b934",
      msg91EmailSubject: "Welcome",
      msg91EmailDescription: "Welcome to our platform",
      msg91SmsTemplateId: "65cb4ee6d6fc05613071b935",
      msg91SmsDescription: "Welcome SMS template",
    }
  ];

  // Update the table columns
  const tableColumns = [
    {
      id: "templateTitle",
      key: "templateTitle",
      label: "Template Title",
      minWidth: 200,
    },
    {
      id: "messageType",
      key: "messageType",
      label: "Message Type",
      minWidth: 150,
    },
    {
      id: "subject",
      key: "subject",
      label: "Subject",
      minWidth: 200,
    },
    {
      id: "createDate",
      key: "createDate",
      label: "Create Date",
      minWidth: 150,
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      minWidth: 150,
      type: "status_toggle" as const,
    },
    {
      id: "actions",
      key: "actions",
      label: "Action",
      type: "custom" as const,
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
      ),
    },
  ];

  // Modified getFormFields to pre-fill values when editing
  const getFormFields = () => {
    const baseFields = [
      {
        type: "text",
        key: "templateTitle",
        label: "Template Title",
        required: true,
        placeholder: "Enter template title",
        value: editingTemplate?.templateTitle || "",
      },
      {
        type: "radio",
        key: "messageType",
        label: "Message Type",
        required: true,
        value: selectedMessageType,
        options: messageTypes?.data?.map(type => ({
        //   label: type.display_name,
        //   value: type.lookup_code.toLowerCase()
        })) || [
          { label: "Both", value: "both" },
          { label: "Email", value: "email" },
          { label: "Sms", value: "sms" },
        ],
        radioStyle: "flex gap-6",
        onChange: (value: string) => setSelectedMessageType(value),
      },
    ];

    const emailFields = [
      {
        type: "text",
        key: "msg91EmailTemplateId",
        label: "Msg91 Email Template Id",
        required: true,
        placeholder: "MSG91 Email Template Id",
        value: editingTemplate?.msg91EmailTemplateId || "",
      },
      {
        type: "text",
        key: "msg91EmailSubject",
        label: "Msg91 Email Subject",
        required: true,
        placeholder: "ex: Good Morning [SELLER_NAME]",
        value: editingTemplate?.msg91EmailSubject || "",
      },
      {
        type: "textarea",
        key: "msg91EmailDescription",
        label: "Msg91 Email Description",
        required: true,
        placeholder: "Enter email description",
        value: editingTemplate?.msg91EmailDescription || "",
      },
    ];

    const smsFields = [
      {
        type: "text",
        key: "msg91SmsTemplateId",
        label: "Msg91 Sms Template Id",
        required: true,
        placeholder: "ex: 65cb4ee6d6fc05613071b932",
        value: editingTemplate?.msg91SmsTemplateId || "",
      },
      {
        type: "textarea",
        key: "msg91SmsDescription",
        label: "Msg91 Sms Description",
        required: true,
        placeholder: "Enter SMS description",
        value: editingTemplate?.msg91SmsDescription || "",
      },
    ];

    // Combine fields based on selected message type
    if (selectedMessageType === "both") {
      return [...baseFields, ...emailFields, ...smsFields];
    } else if (selectedMessageType === "email") {
      return [...baseFields, ...emailFields];
    } else {
      return [...baseFields, ...smsFields];
    }
  };

  const handleProviderClick = (providerId: string) => {
    console.log("Provider clicked:", providerId);
    setSelectedProvider(providerId);
  };

  const handleBackToProviders = () => {
    setSelectedProvider(null);
  };

  const handleFieldChange = (
    sectionKey: string,
    fieldKey: string,
    value: string
  ) => {
    setEditedFields((prev) => ({
      ...prev,
      [`${sectionKey}.${fieldKey}`]: value,
    }));
    setHasChanges(true);
  };

  const prepareUpdatePayload = (provider: any) => {
    return provider.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: {
          value:
            editedFields[`${section.section_key}.${field.field_key}`] ||
            field.value?.value,
        },
      })),
    }));
  };

  const renderProviderList = () => {
    if (!emailSettings?.data) return null;

    const activeProviders = emailSettings.data.filter(
      (provider) => provider.status === "ACTIVATED"
    );
    const inactiveProviders = emailSettings.data.filter(
      (provider) => provider.status === "DEACTIVATED"
    );

    return (
      <div className="space-y-6">
        {/* Active Providers */}
        {activeProviders.map((provider) => (
          <div
            key={provider.id}
            className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
            onClick={() => handleProviderClick(provider.code)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-green-500 text-sm font-medium">
                    Active Now
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {provider.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {provider.tag_text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* All Providers */}
        {inactiveProviders.length > 0 && (
          <>
            <h3 className="text-lg font-medium mt-6 mb-4">
              All {settingType === "EMAIL" ? "Email" : "SMS"} Service providers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inactiveProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                  onClick={() => handleProviderClick(provider.code)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                      <img
                        src={provider.logo}
                        alt={provider.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {provider.tag_text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderProviderDetails = () => {
    if (!emailSettings?.data || !selectedProvider) return null;

    const provider = emailSettings.data.find(
      (p) => p.code === selectedProvider
    );
    if (!provider) return null;

    const handleTestConfig = (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("Test config for provider:", provider.id);
    };

    const handleSetActive = async (e: React.MouseEvent) => {
      e.preventDefault();
      try {
        await dispatch(
          activateEmailProvider(provider.id, provider.setting_type_id)
        );
        // Success notification can be added here
      } catch (error) {
        console.error("Failed to activate provider:", error);
      }
    };

    const handleUpdate = async () => {
      try {
        const updatedSections = prepareUpdatePayload(provider);
        await dispatch(updateEmailProvider(provider.id, updatedSections));
        setEditedFields({});
        setHasChanges(false);
        // Add success notification here
      } catch (error) {
        console.error("Failed to update provider:", error);
        // Add error notification here
      }
    };

    return (
      <div className="space-y-6">
        {/* Breadcrumb and Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={handleBackToProviders}
              className="hover:text-blue-600"
            >
              {settingType === "EMAIL" ? "Email" : "SMS"} Service provider
            </button>
            <span>/</span>
            <span className="text-gray-900">{provider.name}</span>
          </div>
          <div className="flex gap-3">
            {provider.status === "DEACTIVATED" && (
              <button
                onClick={handleSetActive}
                className="px-4 py-2 text-white bg-[#800000] rounded hover:bg-[#600000] uppercase text-sm font-medium"
              >
                Set as Active
              </button>
            )}
            <button
              onClick={handleTestConfig}
              className="px-4 py-2 text-[#800000] border-2 border-[#800000] rounded hover:bg-red-50 uppercase text-sm font-medium"
            >
              Test Configuration
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Provider Info */}
          <div className="space-y-6">
            {/* Logo and Title */}
            <div className="flex flex-col items-center text-center">
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                {provider.tag_text}
              </h2>
              <p className="text-gray-600">{provider.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <a
                href={provider.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#800000] text-white rounded text-center hover:bg-[#600000] transition-colors"
              >
                Read Documentation
              </a>
              <a
                href={provider.redirection_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#800000] text-white rounded text-center hover:bg-[#600000] transition-colors"
              >
                Create Account Now
              </a>
            </div>
          </div>

          {/* Right Column - Configuration Form */}
          <div className="space-y-6">
            {provider.sections?.map((section) => (
              <div key={section.section_key}>
                <h3 className="text-xl font-semibold text-blue-600 mb-6">
                  {section.section_name}
                </h3>
                <div className="space-y-4">
                  {section.fields.map((field) => (
                    <div key={field.field_key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.field_name}{" "}
                        {field.is_mandatory && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        type="text"
                        value={
                          editedFields[
                            `${section.section_key}.${field.field_key}`
                          ] ||
                          field.value?.value ||
                          ""
                        }
                        onChange={(e) =>
                          handleFieldChange(
                            section.section_key,
                            field.field_key,
                            e.target.value
                          )
                        }
                        placeholder={field.placeholder}
                        className="w-full p-2.5 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleBackToProviders}
                className="px-6 py-2 border border-gray-300 rounded uppercase text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!hasChanges}
                className={`px-6 py-2 rounded uppercase text-sm font-medium ${
                  hasChanges
                    ? "bg-[#800000] text-white hover:bg-[#600000]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save & Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="p-2 hover:bg-gray-100 rounded-lg"
          id="back-button"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Email And SMS Settings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            id="email-configuration-button"
            onClick={() => setActiveTab("email")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "email"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Email Configuration
          </button>
          <button
            id="sms-configuration-button"
            onClick={() => setActiveTab("sms")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "sms"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            SMS Configuration
          </button>
          <button
            id="email-sms-templates-button"
            onClick={() => setActiveTab("templates")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "templates"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Email/SMS Templates
          </button>
        </nav>
      </div>

      {/* Templates Content */}
      {activeTab === "templates" && !showAddTemplate && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by Title"
                className="px-4 py-2 border rounded-md text-sm"
                id="search-by-title-input"
              />
              <select 
                className="px-4 py-2 border rounded-md text-sm"
                defaultValue=""
              >
                <option value="">Message type</option>
                {messageTypes?.data?.map(type => (
                  <option 
                    key={type.id} 
                    value={type.lookup_code}
                  >
                    {type.display_name}
                  </option>
                ))}
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
              totalPages: Math.ceil(templateData.length / 10),
            }}
          />
        </div>
      )}

      {/* Add/Edit Template Form */}
      {activeTab === "templates" && showAddTemplate && (
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
                {editingTemplate ? "Edit Template" : "Create Template"}
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              This template creation page is designed to assist you in crafting
              email and SMS notifications for your sellers. Please exercise
              caution when entering sensitive information, as it will be visible
              and sent to your customers.
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
                {editingTemplate ? "UPDATE" : "SAVE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Configuration Content */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">
              Email Service provider
            </h2>
            <p className="text-gray-600 mb-6">
              Integrate our developer-friendly EMAIL API to send and receive
              text messages. Our distributed carrier network and intelligent
              routing ensure the highest delivery and lowest latency.
            </p>

            {selectedProvider ? renderProviderDetails() : renderProviderList()}
          </div>
        </div>
      )}

      {/* SMS Configuration Content */}
      {activeTab === "sms" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">SMS Service provider</h2>
            <p className="text-gray-600 mb-6">
              Integrate our developer-friendly SMS API to send and receive text
              messages. Our distributed carrier network and intelligent routing
              ensure the highest delivery and lowest latency.
            </p>

            {selectedProvider ? renderProviderDetails() : renderProviderList()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAndSmsSettings;
