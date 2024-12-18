import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/AddForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/types';
import { getUserStoreDetails, updateBankDetails, updateStoreDetails } from '../../redux/Action/action';
import GLOBAL_CONSTANTS from '../../GlobalConstants';

const BankingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const storeDetailsState = useSelector((state: RootState) => state.data.storeDetails);
  const { data: storeDetails, loading } = storeDetailsState || { data: null, loading: false };
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: '',
    cancelledCheque: ''
  });

  // Fetch store details on component mount
  useEffect(() => {
    dispatch(getUserStoreDetails());
  }, [dispatch]);

  // Update form data when store details are fetched
  useEffect(() => {
    if (storeDetails?.bank_details) {
      setFormData({
        accountNumber: storeDetails.bank_details.account_number || '',
        bankName: storeDetails.bank_details.bank_name || '',
        ifscCode: storeDetails.bank_details.ifsc_code || '',
        accountHolderName: storeDetails.bank_details.account_holder_name || '',
        cancelledCheque: storeDetails.bank_details.canceller_cheque || ''
      });
    }
  }, [storeDetails]);

  const formFields = [
    {
      type: 'text',
      key: 'accountNumber',
      label: 'Account Number',
      value: formData.accountNumber,
      required: true,
      placeholder: 'Enter your account number'
    },
    {
      type: 'text',
      key: 'bankName',
      label: 'Bank Name',
      value: formData.bankName,
      required: true,
      placeholder: 'Enter your bank name'
    },
    {
      type: 'text',
      key: 'ifscCode',
      label: 'IFSC Code',
      value: formData.ifscCode,
      required: true,
      placeholder: 'Enter IFSC code'
    },
    {
      type: 'text',
      key: 'accountHolderName',
      label: 'Account Holder Name',
      value: formData.accountHolderName,
      required: true,
      placeholder: 'Enter account holder name'
    },
    {
      type: 'image',
      key: 'cancelledCheque',
      label: 'Upload Your Cancelled Cheque',
      value: formData.cancelledCheque,
      required: true
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    const bankId = GLOBAL_CONSTANTS.bankId;
    if (!bankId) {
      console.error('Bank ID not found');
      return;
    }

    dispatch(updateBankDetails(bankId, {
      account_holder_name: formData.accountHolderName,
      account_number: formData.accountNumber,
      canceller_cheque: formData.cancelledCheque,
      ifsc_code: formData.ifscCode,
      penny_transfer_verification: null,
      bank_name: formData.bankName,
      section_key: "BANK_DETAILS"
    }));
  };

  const handleDeactivateStore = () => {
    if (!storeDetails?.id) {
      console.error('Store ID not found');
      return;
    }

    dispatch(updateStoreDetails(storeDetails.id, {
      is_active: false
    })).then(() => {
      setShowDeactivateConfirm(false);
      dispatch(getUserStoreDetails());
    }).catch((error) => {
      console.error('Failed to deactivate store:', error);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Bank Details</h1>
            <p className="text-sm text-gray-600">
              This information will help us to setup your transactions and payments with the ONDC network.
            </p>
          </div>
        </div>
        {storeDetails?.is_active && (
          <button
            onClick={() => setShowDeactivateConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
          >
            <Store size={20} />
            Deactivate Store
          </button>
        )}
      </div>

      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-semibold">Deactivate Store</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to deactivate your store? This will make your store invisible to customers until you reactivate it.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateStore}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-red-500">
                Bank Details Not Verified - 0/3
              </h2>
            </div>
            
            <AddForm
              data={formFields}
              handleInputonChange={handleInputChange}
              handleImageLink={(id, imageUrl) => handleInputChange('cancelledCheque', imageUrl)}
            />

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BankingDetails; 