import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CategoryAndSubCategory from './CategoryAndSubCategory';
import ProductAttributes from './ProductAttributes';

const CatalogueServices = () => {
  const [activeTab, setActiveTab] = useState('category');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Catalogue Services</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('category')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === 'category'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Category & Sub-Category
          </button>
          <button
            onClick={() => setActiveTab('attributes')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === 'attributes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Product Attributes
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'category' ? (
          <CategoryAndSubCategory />
        ) : (
          <ProductAttributes />
        )}
      </div>
    </div>
  );
};

export default CatalogueServices; 