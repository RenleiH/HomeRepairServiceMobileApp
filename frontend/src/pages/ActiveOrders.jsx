import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveOrders = () => {
  const navigate = useNavigate();

  // 模拟订单数据
  const activeOrders = [
    {
      id: '1',
      serviceType: 'Plumbing',
      issue: 'Leaking Faucet',
      status: 'Waiting for Provider',
      provider: null,
      scheduledTime: null,
      createdAt: '2024-04-08 10:30 AM',
    },
    {
      id: '2',
      serviceType: 'Electrical',
      issue: 'Power Outlet Not Working',
      status: 'Provider Assigned',
      provider: {
        name: 'John Smith',
        rating: 4.8,
        phone: '(555) 123-4567'
      },
      scheduledTime: '2024-04-09 2:00 PM',
      createdAt: '2024-04-08 09:15 AM',
    },
    {
      id: '3',
      serviceType: 'HVAC',
      issue: 'AC Not Cooling',
      status: 'In Progress',
      provider: {
        name: 'Mike Johnson',
        rating: 4.9,
        phone: '(555) 987-6543'
      },
      scheduledTime: '2024-04-08 11:00 AM',
      createdAt: '2024-04-08 08:00 AM',
    }
  ];

  // 根据状态返回不同的颜色和图标
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Waiting for Provider':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: '⏳'
        };
      case 'Provider Assigned':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          icon: '👨‍🔧'
        };
      case 'In Progress':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: '🔧'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: '❓'
        };
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* 顶部导航栏 - 固定在顶部 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow sticky top-0 z-10">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Active Orders</h1>
        <div className="w-10"></div>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        <div className="p-4 space-y-4">
          {activeOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* 订单状态栏 */}
              <div className={`px-4 py-2 ${getStatusStyle(order.status).bgColor} flex items-center justify-between`}>
                <span className={`font-medium ${getStatusStyle(order.status).color}`}>
                  {getStatusStyle(order.status).icon} {order.status}
                </span>
                <span className="text-sm text-gray-500">
                  ID: {order.id}
                </span>
              </div>

              {/* 订单详情 */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{order.serviceType}</h3>
                    <p className="text-sm text-gray-600">{order.issue}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {order.createdAt}
                  </span>
                </div>

                {/* 服务提供商信息 */}
                {order.provider && (
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.provider.name}</p>
                        <p className="text-sm text-gray-600">
                          ⭐ {order.provider.rating}
                        </p>
                      </div>
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
                        onClick={() => window.location.href = `tel:${order.provider.phone}`}
                      >
                        📞 Call
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 固定在底部的返回按钮 */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 hover:bg-blue-50 active:transform active:scale-95 transition-all border border-gray-100"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveOrders; 