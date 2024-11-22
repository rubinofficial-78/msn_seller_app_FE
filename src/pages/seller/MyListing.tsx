import React from 'react';

const MyListing = () => {
  const listings = [
    { id: 1, name: 'Product 1', price: 99.99, stock: 50, status: 'Active' },
    { id: 2, name: 'Product 2', price: 149.99, stock: 30, status: 'Active' },
    { id: 3, name: 'Product 3', price: 199.99, stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">${item.price}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListing; 