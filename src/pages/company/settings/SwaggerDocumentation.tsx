import React from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Copy } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { getSwaggerKey } from '../../../redux/Action/action';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';
import { RootState } from '../../../redux/types';
import { toast } from 'react-toastify';

const SwaggerDocumentation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.data.swaggerKey);

  const handleGenerateKey = () => {
    dispatch(getSwaggerKey());
  };

  const maskKey = (key: string) => {
    if (!key) return '';
    const firstFour = key.slice(0, 4);
    const lastFour = key.slice(-4);
    return `${firstFour}${'*'.repeat(key.length - 8)}${lastFour}`;
  };

  const handleCopyKey = () => {
    if (data?.auth_key) {
      navigator.clipboard.writeText(data.auth_key);
      toast.success('Key copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard/company-settings")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Swagger Documentation</h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600 mb-6">
          This information is useful for the usage (Accessing) of the Swagger Documentation
        </p>

        <div className="space-y-6">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Redirection Link
            </span>
            <a 
              className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600" 
              href={`${GLOBAL_CONSTANTS.url}api-docs/`} 
              target="_blank" 
              rel="noreferrer"
            >
              {/* {GLOBAL_CONSTANTS.url}api-docs/ */}
              http://preprod.ondc.adya.ai/api-docs/
              <ExternalLink size={16} />
            </a>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Swagger key
            </span>
            {data?.auth_key && (
              <div className="flex items-center gap-2 mb-4">
                <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                  {maskKey(data.auth_key)}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Copy key"
                >
                  <Copy size={16} />
                </button>
              </div>
            )}
            <button
              onClick={handleGenerateKey}
              disabled={loading}
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 text-sm disabled:opacity-50"
            >
              {loading ? 'GENERATING...' : 'GENERATE KEY'}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwaggerDocumentation; 