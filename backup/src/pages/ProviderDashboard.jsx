import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  // Uber Style: Clean and minimal menu items
  const menuItems = [
    {
      title: 'Active Orders',
      icon: '📋',
      count: 5,
      color: 'blue',
      onClick: () => navigate('/provider/orders')
    },
    {
      title: 'Order History',
      icon: '📊',
      count: 28,
      color: 'green',
      onClick: () => navigate('/provider/order-history')
    },
    {
      title: 'Messages',
      icon: '💬',
      count: 8,
      color: 'yellow',
      onClick: () => navigate('/provider/messages')
    },
    {
      title: 'Profile',
      icon: '👤',
      color: 'blue',
      onClick: () => navigate('/provider/profile')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Uber Style: Clean header */}
      <div className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button
            variant="secondary"
            onClick={() => navigate('/provider/available-orders')}
          >
            View Available Orders
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">$2,450</p>
            </div>
          </Card>
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Orders</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </Card>
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </Card>
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center p-6 space-y-4"
            >
              <div className={`p-4 rounded-xl ${item.color === 'blue' ? 'bg-blue-50' : 
                item.color === 'green' ? 'bg-green-50' : 
                item.color === 'yellow' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
                <span className="text-3xl">{item.icon}</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                {item.count && (
                  <p className="text-sm text-gray-500">{item.count} items</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 