import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedOrders = () => {
  const navigate = useNavigate();

  // 使用 getWarrantyStatus 函数替代
  const getWarrantyStatus = (completedDate, warrantyDays) => {
    const completionDate = new Date(completedDate);
    const warrantyEndDate = new Date(completionDate.setDate(completionDate.getDate() + warrantyDays));
    const today = new Date();
    const daysLeft = Math.ceil((warrantyEndDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 0) {
      return {
        text: 'Warranty Expired',
        color: 'text-gray-500'
      };
    } else {
      return {
        text: `${daysLeft} days left`,
        color: 'text-green-600'
      };
    }
  };

  // 模拟完成的订单数据
  const completedOrders = [
    {
      id: 'ORD001',
      serviceType: 'Plumbing',
      issue: 'Water Heater Replacement',
      completedDate: '2023-06-15', // 较早的日期
      provider: {
        name: 'John Smith',
        company: 'Quick Fix Plumbing',
        rating: 4.8,
        photo: null
      },
      cost: 850,
      duration: '4 hours',
      rating: 5,
      review: 'Great service! The new water heater works perfectly.',
      photos: ['heater1.jpg', 'heater2.jpg'],
      warrantyDays: 365, // 一年保修
      paymentMethod: 'Credit Card',
      invoice: 'INV001.pdf'
    },
    {
      id: 'ORD002',
      serviceType: 'Electrical',
      issue: 'Circuit Panel Upgrade',
      completedDate: '2024-03-01', // 较近的日期
      provider: {
        name: 'Sarah Chen',
        company: 'PowerPro Electric',
        rating: 4.9,
        photo: null
      },
      cost: 1200,
      duration: '6 hours',
      rating: 5,
      review: 'Excellent work on upgrading our electrical panel. Very professional.',
      photos: ['panel1.jpg', 'panel2.jpg'],
      warrantyDays: 730, // 两年保修
      paymentMethod: 'Bank Transfer',
      invoice: 'INV002.pdf'
    },
    {
      id: 'ORD003',
      serviceType: 'Carpentry',
      issue: 'Built-in Shelving Installation',
      completedDate: '2024-02-15', // 较近的日期
      provider: {
        name: 'Tom Anderson',
        company: 'Master Woodworks',
        rating: 5.0,
        photo: null
      },
      cost: 2200,
      duration: '2 days',
      rating: 5,
      review: 'Beautiful custom shelving, perfect craftsmanship!',
      photos: ['shelf1.jpg', 'shelf2.jpg', 'shelf3.jpg'],
      warrantyDays: 365, // 一年保修
      paymentMethod: 'Credit Card',
      invoice: 'INV003.pdf'
    },
    {
      id: 'ORD004',
      serviceType: 'HVAC',
      issue: 'AC Maintenance and Repair',
      completedDate: '2023-09-10', // 半年多以前
      provider: {
        name: 'Mike Wilson',
        company: 'Cool Air Systems',
        rating: 4.9,
        photo: null
      },
      cost: 380,
      duration: '3 hours',
      rating: 5,
      review: 'Thorough maintenance service, AC working much better now.',
      photos: ['ac1.jpg'],
      warrantyDays: 180, // 半年保修
      paymentMethod: 'Credit Card',
      invoice: 'INV004.pdf'
    }
  ];

  // 获取总花费
  const totalSpent = completedOrders.reduce((sum, order) => sum + order.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 - 固定在顶部 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard/homeowner')}
            className="text-blue-500"
          >
            <span className="hidden sm:inline">←</span>
          </button>
          <h1 className="text-lg font-semibold">Completed Orders</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* 统计摘要 */}
        <div className="bg-white p-4 mt-2 mx-4 rounded-xl shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl font-semibold">{completedOrders.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-xl font-semibold">${totalSpent}</p>
            </div>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="p-4 space-y-4">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 订单头部 */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{order.serviceType}</h3>
                    <p className="text-sm text-gray-600">{order.issue}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {order.completedDate}
                  </span>
                </div>
                
                {/* 服务提供商信息 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    👨‍🔧
                  </div>
                  <div>
                    <p className="font-medium">{order.provider.name}</p>
                    <p className="text-sm text-gray-600">{order.provider.company}</p>
                  </div>
                </div>
              </div>

              {/* 订单详情 */}
              <div className="p-4 space-y-3">
                {/* 成本和时长 */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cost</span>
                  <span className="font-medium">${order.cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{order.duration}</span>
                </div>

                {/* 评分和评价 */}
                <div className="border-t pt-3">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < order.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{order.review}</p>
                </div>

                {/* 照片预览 */}
                {order.photos.length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">Photos</p>
                    <div className="flex space-x-2">
                      {order.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
                        >
                          📷
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="border-t pt-3 flex justify-between">
                  <button
                    onClick={() => {/* 处理下载发票 */}}
                    className="text-blue-500 text-sm"
                  >
                    📄 Download Invoice
                  </button>
                  <button
                    onClick={() => {/* 处理联系供应商 */}}
                    className="text-blue-500 text-sm"
                  >
                    📞 Contact Provider
                  </button>
                </div>

                {/* 保修信息 */}
                <div className="text-sm border-t pt-3">
                  <p className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center">
                      <span className="mr-1">🛡️</span>
                      Warranty Status
                    </span>
                    <span className={`font-medium ${getWarrantyStatus(order.completedDate, order.warrantyDays).color}`}>
                      {getWarrantyStatus(order.completedDate, order.warrantyDays).text}
                    </span>
                  </p>
                </div>
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
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>
    </div>
  );
};

export default CompletedOrders; 