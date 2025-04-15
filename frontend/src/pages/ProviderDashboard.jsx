import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [statIndex, setStatIndex] = useState(0);

  const stats = [
    {
      label: 'Monthly Earnings',
      value: '$2,850',
      icon: '💰',
      change: '+12%',
      description: 'vs last month',
      changeType: 'up',
      bg: 'bg-yellow-100',
    },
    {
      label: 'Active Orders',
      value: '3',
      icon: '📋',
      change: '+8%',
      description: 'vs last month',
      changeType: 'up',
      bg: 'bg-green-100',
    },
    {
      label: 'Customer Rating',
      value: '4.5',
      icon: '⭐',
      change: '+0.2',
      description: 'vs last month',
      changeType: 'up',
      bg: 'bg-yellow-100',
    },
    {
      label: 'Pending Requests',
      value: '2',
      icon: '⏳',
      change: '-2',
      description: 'vs last month',
      changeType: 'down',
      bg: 'bg-red-100',
    },
  ];

  const prevStat = () => {
    setStatIndex((prev) => (prev === 0 ? stats.length - 1 : prev - 1));
  };

  const nextStat = () => {
    setStatIndex((prev) => (prev === stats.length - 1 ? 0 : prev + 1));
  };

  const currentStat = stats[statIndex];

  const menuItems = [
    {
      title: 'Service Requests',
      icon: '🔧',
      route: '/provider/requests'
    },
    {
      title: 'Active Orders',
      icon: '📋',
      route: '/provider/active'
    },
    {
      title: 'Order History',
      icon: '📊',
      route: '/provider/history'
    },
    {
      title: 'Payments',
      icon: '💰',
      route: '/provider/payments'
    },
    {
      title: 'Reviews',
      icon: '⭐',
      route: '/provider/reviews'
    },
    {
      title: 'Advertising',
      icon: '📢',
      route: '/provider/advertising'
    }
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* User Profile Header */}
      <div className="bg-white p-3 shadow">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/provider/profile')}
            className="relative"
          >
            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  👤
                </div>
              )}
            </div>
          </button>
          <div>
            <h1 className="text-xl font-semibold">{user?.name || 'Welcome'}</h1>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center gap-2">
          <span role="img" aria-label="bar">📊</span> Performance Overview
        </h2>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevStat}
            className="text-xl font-bold px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Previous stat"
          >
            ‹
          </button>

          <div className="w-full max-w-xs bg-white p-3 rounded-lg shadow flex flex-col items-center text-center space-y-1">
            <div className={`w-11 h-11 flex items-center justify-center text-xl rounded-full ${currentStat.bg}`}>
              {currentStat.icon}
            </div>
            <div className="text-sm text-gray-500">{currentStat.label}</div>
            <div className="text-2xl font-bold">{currentStat.value}</div>
            <div
              className={`text-xs ${
                currentStat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {currentStat.change}{' '}
              <span className="text-gray-400">{currentStat.description}</span>
            </div>
          </div>

          <button
            onClick={nextStat}
            className="text-xl font-bold px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Next stat"
          >
            ›
          </button>
        </div>
      </div>

      {/* 主菜单选项 */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-1 hover:bg-gray-50 active:transform active:scale-95 transition-all"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.title}</span>
            </button>
          ))}
        </div>

        {/* AI Chat Button */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => navigate('/ai-chat')}
            className="w-full bg-blue-600 rounded-lg py-2.5 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            aria-label="Open AI Chat"
          >
            <span className="text-xl">🤖</span>
            <span className="text-white font-medium text-sm">AI Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 