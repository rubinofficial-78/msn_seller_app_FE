import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload } from 'lucide-react';

const schema = z.object({
  gstNumber: z.string().min(15, 'GST number must be 15 characters').max(15),
  panNumber: z.string().min(10, 'PAN number must be 10 characters').max(10),
  gstCertificate: z.any().refine((file) => file?.length > 0, 'GST certificate is required'),
  panCard: z.any().refine((file) => file?.length > 0, 'PAN card is required'),
});

const GstInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-blue-900">GST & PAN Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            GST Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('gstNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter GST Number"
          />
          {errors.gstNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.gstNumber.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('panNumber')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter PAN Number"
          />
          {errors.panNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.panNumber.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload GST Certificate <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    {...register('gstCertificate')}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
          {errors.gstCertificate && (
            <p className="mt-1 text-sm text-red-600">{errors.gstCertificate.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload PAN Card <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    {...register('panCard')}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
          {errors.panCard && (
            <p className="mt-1 text-sm text-red-600">{errors.panCard.message as string}</p>
          )}
        </div>
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

export default GstInfo; 