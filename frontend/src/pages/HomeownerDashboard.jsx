import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeownerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { icon: '📝', title: 'Create New Order', route: '/create-order' },
    { icon: '⏳', title: 'Active Orders', route: '/active-orders' },
    { icon: '✅', title: 'Completed Orders', route: '/completed-orders' },
    { icon: '⭐', title: 'My Reviews', route: '/my-reviews' },
    { icon: '💳', title: 'Payment Methods', route: '/payment-methods' },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* 顶部个人信息栏 */}
      <div className="bg-white p-4 shadow">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/homeowner/profile')}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
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

      {/* 主菜单选项 */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 active:transform active:scale-95 transition-all"
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
            className="w-full bg-blue-600 rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            aria-label="Open AI Chat"
          >
            <span className="text-2xl">🤖</span>
            <span className="text-white font-medium">AI Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeownerDashboard; 