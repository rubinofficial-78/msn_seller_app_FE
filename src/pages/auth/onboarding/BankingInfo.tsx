import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload } from 'lucide-react';

const schema = z.object({
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  accountNumber: z.string().min(8, 'Invalid account number'),
  confirmAccountNumber: z.string().min(8, 'Invalid account number'),
  ifscCode: z.string().min(11, 'IFSC code must be 11 characters').max(11),
  bankName: z.string().min(1, 'Bank name is required'),
  branchName: z.string().min(1, 'Branch name is required'),
  cancelledCheque: z.any().refine((file) => file?.length > 0, 'Cancelled cheque is required'),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers don't match",
  path: ['confirmAccountNumber'],
});

const BankingInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-blue-900">Banking Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Holder Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('accountHolderName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter account holder name"
          />
          {errors.accountHolderName && (
            <p className="mt-1 text-sm text-red-600">{errors.accountHolderName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('accountNumber')}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter account number"
          />
          {errors.accountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.accountNumber.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Account Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('confirmAccountNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Confirm account number"
          />
          {errors.confirmAccountNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmAccountNumber.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            IFSC Code <span className="text-red-500">*</span>
          </label>
          <input
            {...register('ifscCode')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter IFSC code"
          />
          {errors.ifscCode && (
            <p className="mt-1 text-sm text-red-600">{errors.ifscCode.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Cancelled Cheque <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    {...register('cancelledCheque')}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
          {errors.cancelledCheque && (
            <p className="mt-1 text-sm text-red-600">{errors.cancelledCheque.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    </form>
  );
};

export default BankingInfo; 