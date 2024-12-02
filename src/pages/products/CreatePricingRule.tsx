import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddForm from "../../components/AddForm";

interface PricingRuleForm {
  ruleName: string;
  ruleType: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  minOrderValue: number;
  maxDiscountAmount: number;
  description: string;
  applicableProducts: string[];
}

const CreatePricingRule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PricingRuleForm>({
    ruleName: "",
    ruleType: "",
    discountType: "",
    discountValue: 0,
    startDate: "",
    endDate: "",
    minOrderValue: 0,
    maxDiscountAmount: 0,
    description: "",
    applicableProducts: [],
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    navigate("/dashboard/products");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Create Pricing Rule</h2>
          <p className="text-sm text-gray-500">Add a new pricing rule for your products</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <AddForm
            data={[
              {
                type: "text",
                key: "ruleName",
                label: "Rule Name",
                required: true,
                value: formData.ruleName,
                placeholder: "Enter rule name",
              },
              // Add other form fields here
            ]}
            handleInputonChange={handleInputChange}
            handleSelectonChange={handleInputChange}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => navigate("/dashboard/products")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              Create Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePricingRule; 