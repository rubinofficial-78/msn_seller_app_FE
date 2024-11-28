import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import SellerInfo from "./onboarding/SellerInfo";
import GstInfo from "./onboarding/GstInfo";
import BankingInfo from "./onboarding/BankingInfo";
import { useAuth } from "../../contexts/AuthContext";

const steps = [
  { 
    id: "01", 
    name: "Seller Store Information", 
    description: "Basic details about you and your store"
  },
  { 
    id: "02", 
    name: "GST & PAN Details", 
    description: "Your business verification details"
  },
  { 
    id: "03", 
    name: "Banking Details", 
    description: "Your payment receiving account details"
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sellerInfo: {},
    gstInfo: {},
    bankingInfo: {},
  });
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            {isAdmin ? "Admin Onboarding" : "Seller Onboarding"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin 
              ? "Complete your admin profile setup"
              : "Complete your profile to start selling"}
          </p>
        </div>

        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center justify-center gap-8">
            {steps.map((step, index) => (
              <li key={step.id} className="relative flex flex-col items-center">
                <div className={`flex items-center ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}>
                  <span className={`
                    w-10 h-10 flex items-center justify-center rounded-full 
                    border-2 text-sm font-semibold
                    ${index < currentStep 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : index === currentStep 
                      ? "border-blue-600 text-blue-600" 
                      : "border-gray-300"
                    }
                  `}>
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-full w-24 h-0.5 -translate-y-1/2 bg-gray-200" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {currentStep === 0 && <SellerInfo onNext={handleNext} />}
            {currentStep === 1 && <GstInfo onNext={handleNext} />}
            {currentStep === 2 && <BankingInfo onNext={handleNext} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
