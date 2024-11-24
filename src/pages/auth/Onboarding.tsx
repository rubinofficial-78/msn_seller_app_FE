import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import SellerInfo from "./onboarding/SellerInfo";
import GstInfo from "./onboarding/GstInfo";
import BankingInfo from "./onboarding/BankingInfo";

const steps = [
  { id: "01", name: "SELLER STORE INFORMATION", status: "current" },
  { id: "02", name: "GST PAN DETAILS", status: "upcoming" },
  { id: "03", name: "BANKING DETAILS", status: "upcoming" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sellerInfo: {},
    gstInfo: {},
    bankingInfo: {},
  });
  const navigate = useNavigate();

  const handleNext = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      [currentStep === 0
        ? "sellerInfo"
        : currentStep === 1
        ? "gstInfo"
        : "bankingInfo"]: data,
    }));

    if (currentStep === 2) {
      // Submit all data
      navigate("/dashboard/seller-dashboard");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-8">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className="relative flex items-center">
                <div
                  className={`flex items-center ${
                    index <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                    ${
                      index < currentStep
                        ? "bg-blue-600 border-blue-600"
                        : index === currentStep
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </span>
                  <span className="ml-4 text-sm font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-full bg-gray-200 h-0.5 mx-8" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {currentStep === 0 && <SellerInfo onNext={handleNext} />}
          {currentStep === 1 && <GstInfo onNext={handleNext} />}
          {currentStep === 2 && <BankingInfo onNext={handleNext} />}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
