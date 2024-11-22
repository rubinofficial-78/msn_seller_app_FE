import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  sellerName: z.string().min(1, 'Seller name is required'),
  mobileNumber: z.string().min(10, 'Invalid mobile number'),
  email: z.string().email('Invalid email'),
  storeName: z.string().min(1, 'Store name is required'),
  storeWebsite: z.string().url().optional(),
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  pinCode: z.string().min(6, 'Invalid pin code'),
});

const SellerInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-blue-900">Seller Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seller Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('sellerName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.sellerName ? (
            <p className="mt-1 text-sm text-red-600">{errors.sellerName.message as string}</p>
          ) : null}
        </div>
        
        {/* Add other form fields similarly */}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default SellerInfo; 