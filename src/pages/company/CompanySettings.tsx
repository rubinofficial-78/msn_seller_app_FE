import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { ArrowLeft, CreditCard, Users, Eye, FileText, BookOpen } from "lucide-react";

const CompanySettings = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const settingsCards = [
    {
      title: "Basic Details",
      description: "Manage your company profile, contact information, and other basic details",
      route: "/dashboard/company-settings/basic-details",
      permissions: ["COMPANY_PARTNER"],
      icon: <CreditCard className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Banking Details",
      description: "Configure bank account information, payment settings, and financial details",
      route: "/dashboard/company-settings/banking-details",
      permissions: ["COMPANY_PARTNER"],
      icon: <CreditCard className="w-6 h-6 text-blue-600" />
    },
    {
      title: "UI Customizations",
      description: "Customize your platform's appearance, branding colors, and visual elements",
      route: "/dashboard/company-settings/ui-config",
      permissions: ["COMPANY_PARTNER"],
      icon: <Eye className="w-6 h-6 text-blue-600" />
    },
    {
      title: "System Users",
      description: "Manage user accounts, roles, permissions, and access controls",
      route: "/dashboard/company-settings/system-users",
      permissions: ["COMPANY_PARTNER"],
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Swagger Documentation",
      description: "Access API documentation, integration guides, and technical resources",
      route: "/dashboard/company-settings/swagger-docs",
      permissions: ["COMPANY_PARTNER"],
      icon: <BookOpen className="w-6 h-6 text-blue-600" />
    }
  ];

  const allowedCards = settingsCards.filter((card) =>
    card.permissions.includes(userRole || "")
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Company Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allowedCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            onClick={() => navigate(card.route)}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanySettings;
