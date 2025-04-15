import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderActiveOrders = () => {
  const navigate = useNavigate();

  // Mock active orders data
  const activeOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      service: 'Plumbing Repair',
      status: 'In Progress',
      scheduledTime: '2024-03-20 14:00',
      address: '123 Main St, City',
      price: '$150',
      description: 'Leaking pipe under kitchen sink',
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      service: 'Electrical Work',
      status: 'Scheduled',
      scheduledTime: '2024-03-21 10:00',
      address: '456 Oak Ave, City',
      price: '$200',
      description: 'Install new light fixtures in living room',
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Johnson',
      service: 'Plumbing',
      status: 'On Way',
      scheduledTime: '2024-03-20 16:30',
      address: '789 Pine St, City',
      price: '$180',
      description: 'Bathroom faucet replacement',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Way':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/provider')}
            className="text-blue-600 hover:text-blue-700"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Active Orders</h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {activeOrders.map((order) => (
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
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Scheduled Time</p>
                <p className="font-medium">{order.scheduledTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">{order.price}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{order.description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Contact Customer
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderActiveOrders; 