import React from "react";
import { CreditCard, Users, Settings, FileText, Mail, Map, Eye } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, onClick, icon }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-2 bg-blue-50 rounded-lg">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
