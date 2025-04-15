import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderOrderHistory = () => {
  const navigate = useNavigate();
  const [filterMonth, setFilterMonth] = useState('all');

  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      service: 'Plumbing Repair',
      completedDate: '2024-03-15',
      price: '$150',
      rating: 5,
      review: 'Excellent service! Fixed the issue quickly and professionally.',
      address: '123 Main St, City',
      description: 'Fixed leaking pipe under kitchen sink',
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      service: 'Electrical Installation',
      completedDate: '2024-03-10',
      price: '$280',
      rating: 4,
      review: 'Good work, but took a bit longer than expected.',
      address: '456 Oak Ave, City',
      description: 'Installed new light fixtures and switches',
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Johnson',
      service: 'HVAC Maintenance',
      completedDate: '2024-03-05',
      price: '$200',
      rating: 5,
      review: 'Very thorough and professional service.',
      address: '789 Pine St, City',
      description: 'Annual AC maintenance and filter replacement',
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard/provider')}
              className="text-blue-600 hover:text-blue-700"
            >
              ←
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
          </div>
          
          {/* Filter */}
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="3-months">Last 3 Months</option>
          </select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{orderHistory.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="text-2xl font-bold">4.7</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold">$630</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {order.service}
                </h3>
                <p className="text-gray-600 text-sm">{order.customerName}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-lg">{order.price}</p>
                <p className="text-sm text-gray-500">{order.completedDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1 mb-1">
                {renderStars(order.rating)}
              </div>
              <p className="text-gray-600 text-sm italic">"{order.review}"</p>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-gray-500">Description</p>
                <p className="font-medium">{order.description}</p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderOrderHistory; 