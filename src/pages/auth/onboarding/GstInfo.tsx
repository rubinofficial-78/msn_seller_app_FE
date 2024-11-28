import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../../components/AddForm";
import { getLookupCodes, updateBusinessSettings } from "../../../redux/Action/action";
import { RootState } from "../../../redux/types";
import { AppDispatch } from "../../../redux/store";
import { toast } from "react-toastify";

interface BusinessType {
  id: number;
  display_name: string;
  lookup_code: string;
}

const GstInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: businessTypes, loading } = useSelector((state: RootState) => state.data.lookupCodes);
  
  const [formValues, setFormValues] = useState({
    gstNumber: "",
    businessType: "",
    govtId: "",
    signature: "",
    businessTypeId: null as number | null
  });

  useEffect(() => {
    dispatch(getLookupCodes('TYPE_OF_BUSINESS'));
  }, [dispatch]);

  const handleInputChange = (key: string, value: any) => {
    if (key === "businessType") {
      // Find the corresponding business type ID
      const selectedType = businessTypes?.find((type: BusinessType) => type.lookup_code === value);
      setFormValues(prev => ({
        ...prev,
        [key]: value,
        businessTypeId: selectedType?.id || null
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleImageLink = (id: string, link: string | null) => {
    setFormValues(prev => ({
      ...prev,
      [id]: link || ""
    }));
  };

  const handleVerifyGST = () => {
    console.log("Verifying GST:", formValues.gstNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formValues.businessTypeId) {
      toast.error("Please select a business type");
      return;
    }
    if (!formValues.gstNumber) {
      toast.error("Please enter GST number");
      return;
    }
    if (!formValues.signature) {
      toast.error("Please upload your signature");
      return;
    }

    try {
      const payload = {
        business_type_id: formValues.businessTypeId,
        gstin: formValues.gstNumber,
        signature: formValues.signature,
        section_key: "BUSINESS_DETAILS"
      };

      // Log the payload for debugging
      console.log('Submitting payload:', payload);

      // Get token for debugging
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const result = await dispatch(updateBusinessSettings(2, payload));
      
      // Log the complete response for debugging
      console.log('Complete API Response:', result);

      // Check if result has the expected structure
      if (result?.payload?.meta?.status) {
        toast.success("Business settings updated successfully");
        onNext(formValues);
      } else if (result?.payload?.meta?.message) {
        // Show specific error message from API
        toast.error(result.payload.meta.message);
      } else {
        // Show generic error if no specific message
        toast.error("Failed to update business settings. Please try again.");
      }
    } catch (error: any) {
      // Log detailed error for debugging
      console.error('Error updating business settings:', {
        error,
        message: error?.message,
        response: error?.response?.data
      });

      // Show appropriate error message
      if (error?.response?.data?.meta?.message) {
        toast.error(error.response.data.meta.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const formFields = [
    {
      type: "custom",
      key: "gstSection",
      component: (
        <div className="mb-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-blue-900">
              GST, PAN & TAN Information
            </h2>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={formValues.gstNumber}
              onChange={(e) => handleInputChange("gstNumber", e.target.value)}
              placeholder="Enter GST Number"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleVerifyGST}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              VERIFY
            </button>
          </div>
        </div>
      )
    },
    {
      type: "custom",
      key: "businessType",
      component: (
        <div className="mb-6">
          <label className="block text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-md mb-3">
            Business Type
          </label>
          <div className="space-y-3">
            {loading ? (
              <div>Loading business types...</div>
            ) : (
              businessTypes?.map((type: BusinessType) => (
                <label key={type.id} className="flex items-center">
                  <input
                    type="radio"
                    name="businessType"
                    value={type.lookup_code}
                    checked={formValues.businessType === type.lookup_code}
                    onChange={(e) => handleInputChange("businessType", e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type.display_name}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )
    },
    {
      type: "image",
      key: "govtId",
      label: "Upload Government Authorized Id Proof",
      value: formValues.govtId,
      uploadText: "Upload a file",
      uploadDescription: "PNG, SVG up to 10MB",
      handleImageLink,
      description: "For the ID proof image, please ensure image is not blur or tilted or has any light glare on it. Any Government Authorized Identification Card/paper which has your Image and Address will work. Like Passport, Aadhaar Card, PAN Card etc.",
      showLable: false
    },
    {
      type: "image",
      key: "signature",
      label: "Upload Your Signature",
      value: formValues.signature,
      uploadText: "Upload a file",
      uploadDescription: "PNG, SVG up to 10MB",
      handleImageLink,
      description: "Upload your signature which is required for legal documentations.",
      showLable: false
    }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <AddForm
        data={formFields}
        handleInputonChange={handleInputChange}
        handleImageLink={handleImageLink}
      />
      
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default GstInfo; 