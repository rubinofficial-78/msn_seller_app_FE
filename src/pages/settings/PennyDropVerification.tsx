import React, { useState, useEffect } from "react";
import { ArrowLeft, ExternalLink, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailSettings,
  activateEmailProvider,
  updateEmailProvider,
} from "../../redux/Action/action";
import { RootState } from "../../redux/types";

const PennyDropVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [editedFields, setEditedFields] = useState<{ [key: string]: any }>({});
  const [hasChanges, setHasChanges] = useState(false);

  const pennyDropSettings = useSelector(
    (state: RootState) => state.data.emailSettings
  );
  const activateProviderStatus = useSelector(
    (state: RootState) => state.data.activateEmailProvider
  );

  useEffect(() => {
    dispatch(getEmailSettings("PENNY_DROP"));
  }, [dispatch]);

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

  const handleProviderClick = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleBackToProviders = () => {
    setSelectedProvider(null);
  };

  const handleTestConfiguration = () => {
    setShowConfigDialog(true);
  };

  const handleVerify = () => {
    setShowConfigDialog(false);
  };

  const handleActivateProvider = async (providerId: number) => {
    try {
      await dispatch(activateEmailProvider(providerId, "PENNY_DROP"));
      dispatch(getEmailSettings("PENNY_DROP")); // Refresh the list after activation
    } catch (error) {
      console.error("Failed to activate provider:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedProvider || !hasChanges) return;

    const provider = pennyDropSettings?.data?.find(
      (p) => p.code === selectedProvider
    );
    if (!provider) return;

    try {
      // Get the original sections from the provider
      const updatedSections = provider.sections?.map((section) => ({
        section_key: section.section_key,
        section_name: section.section_name,
        section_sequence: section.section_sequence,
        section_description: section.section_description,
        fields: section.fields.map((field) => {
          // Check if this field has been edited
          const editedValue =
            editedFields[`${section.section_key}.${field.field_key}`];

          return {
            ...field,
            value: editedValue ? { value: editedValue } : field.value,
          };
        }),
      }));

      const formattedData = {
        sections: updatedSections,
      };

      await dispatch(updateEmailProvider(provider.id, formattedData));
      dispatch(getEmailSettings("PENNY_DROP")); // Refresh the data
      setHasChanges(false);
      handleBackToProviders();
    } catch (error) {
      console.error("Failed to update provider:", error);
    }
  };

  const renderProviderList = () => {
    if (!pennyDropSettings?.data) return null;

    const activeProviders = pennyDropSettings.data.filter(
      (provider) => provider.status === "ACTIVATED"
    );
    const inactiveProviders = pennyDropSettings.data.filter(
      (provider) => provider.status === "DEACTIVATED"
    );

    return (
      <>
        {/* Active Providers */}
        {activeProviders.map((provider) => (
          <div key={provider.id} className="border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border p-2 cursor-pointer"
                  onClick={() => handleProviderClick(provider.code)}
                >
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-green-500 text-sm font-medium">
                    Active Now
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {provider.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Inactive Providers */}
        {inactiveProviders.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">
              All Penny Drop Verification Providers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inactiveProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => handleProviderClick(provider.code)}
                    >
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivateProvider(provider.id);
                      }}
                      className="px-4 py-2 bg-[#800000] text-white rounded-md text-sm hover:bg-[#600000]"
                      disabled={activateProviderStatus?.loading}
                    >
                      {activateProviderStatus?.loading
                        ? "Activating..."
                        : "Set as Active"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderProviderDetails = () => {
    if (!pennyDropSettings?.data || !selectedProvider) return null;

    const provider = pennyDropSettings.data.find(
      (p) => p.code === selectedProvider
    );
    if (!provider) return null;

    return (
      <div className="space-y-6">
        {/* Provider Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={handleBackToProviders}
              className="hover:text-blue-600"
            >
              Penny Drop Verification Provider
            </button>
            <span>/</span>
            <span className="text-gray-900">{provider.name}</span>
          </div>
          <button
            onClick={handleTestConfiguration}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded"
          >
            Test Configuration
          </button>
        </div>

        {/* Provider Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Provider Info */}
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg border p-4">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600">
                  {provider.name}
                </h2>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{provider.description}</p>

            <div className="flex gap-4">
              <a
                href={provider.documentation_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-blue-900 text-white rounded text-center"
              >
                Read Documentation
              </a>
              <a
                href={provider.redirection_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#800000] text-white rounded text-center"
              >
                Create Account Now
              </a>
            </div>
          </div>

          {/* Right Column - Configuration Form */}
          <div className="space-y-6">
            {provider.sections && Array.isArray(provider.sections) ? (
              provider.sections.map((section) => (
                <div key={section.section_key}>
                  <h3 className="text-xl font-semibold text-blue-600 mb-6">
                    {section.section_name}
                  </h3>
                  <div className="space-y-4">
                    {section.fields && Array.isArray(section.fields) ? (
                      section.fields.map((field) => (
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
                      ))
                    ) : (
                      <p>No fields available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No configuration sections available</p>
            )}

            {/* Cancel and Save & Update buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleBackToProviders}
                className="px-6 py-2 border border-gray-300 rounded uppercase text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
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
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Penny Drop Verification</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600 mb-6">
          Integrate our penny drop verification service to verify bank accounts
          instantly. Our secure verification process ensures reliable and quick
          account validation.
        </p>

        {selectedProvider ? renderProviderDetails() : renderProviderList()}
      </div>

      {/* Test Configuration Dialog */}
      {showConfigDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Banknote className="text-green-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold">PENNY DROP TEST</h3>
            </div>
            <p className="text-gray-600 mb-4">Test penny drop configuration</p>

            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter account number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfigDialog(false)}
                className="px-4 py-2 border rounded-md text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={handleVerify}
                className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
              >
                VERIFY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PennyDropVerification;
