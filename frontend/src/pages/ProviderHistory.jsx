import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderHistory = () => {
  const navigate = useNavigate();
  const [filterMonth, setFilterMonth] = useState('All');

  // 模拟历史订单数据
  const historyOrders = [
    {
      id: 'HIS001',
      serviceType: 'Plumbing',
      customer: {
        name: 'Charlie Brown',
        photo: null,
        rating: 4.8
      },
      location: '789 Pine St, City',
      description: 'Fixed a leaking faucet in the bathroom.',
      photos: ['faucet1.jpg', 'faucet2.jpg'],
      completedAt: '2024-03-15 16:30',
      totalAmount: 200,
      paymentStatus: 'Paid',
      customerReview: {
        rating: 5,
        comment: 'Excellent service! Very professional and completed the work quickly.',
        date: '2024-03-16'
      },
      serviceDetails: {
        duration: '1.5 hours',
        materials: ['New faucet', 'Sealant'],
        notes: 'Customer was very satisfied with the work'
      }
    },
    {
      id: 'HIS002',
      serviceType: 'Plumbing',
      customer: {
        name: 'Diana Ross',
        photo: null,
        rating: 4.9
      },
      location: '321 Maple Dr, City',
      description: 'Replaced old pipes in the kitchen.',
      photos: ['pipes1.jpg', 'pipes2.jpg'],
      completedAt: '2024-03-10 14:20',
      totalAmount: 2650,
      paymentStatus: 'Paid',
      customerReview: {
        rating: 4,
        comment: 'Good service overall, but took a bit longer than expected.',
        date: '2024-03-11'
      },
      serviceDetails: {
        duration: '3 hours',
        materials: ['PVC pipes', 'Connectors', 'Sealant'],
        notes: 'Complex job due to old pipe system'
      }
    }
  ];

  // 计算统计数据
  const stats = {
    totalOrders: historyOrders.length,
    totalEarnings: historyOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    averageRating: (historyOrders.reduce((sum, order) => sum + order.customerReview.rating, 0) / historyOrders.length).toFixed(1),
    totalReviews: historyOrders.length
  };

  // 根据月份筛选订单
  const filteredOrders = filterMonth === 'All'
    ? historyOrders
    : historyOrders.filter(order => order.completedAt.startsWith(filterMonth));

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
        <button
          onClick={() => navigate('/dashboard/provider')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Order History</h1>
        <div className="w-10"></div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Total Orders</h3>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Total Earnings</h3>
          <p className="text-2xl font-semibold">${stats.totalEarnings}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Average Rating</h3>
          <p className="text-2xl font-semibold">{stats.averageRating} ★</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Total Reviews</h3>
          <p className="text-2xl font-semibold">{stats.totalReviews}</p>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="bg-white p-4 mx-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filter by Month</h2>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="All">All Time</option>
            <option value="2024-03">March 2024</option>
            <option value="2024-02">February 2024</option>
            <option value="2024-01">January 2024</option>
          </select>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{order.serviceType}</h3>
                  <p className="text-sm text-gray-600">{order.location}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Completed
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < Math.round(order.customer.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mb-3">{order.description}</p>

              {/* 服务详情 */}
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Duration:</span>
                  <span className="text-sm text-gray-600">{order.serviceDetails.duration}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Materials Used:</span>
                  <span className="text-sm text-gray-600">{order.serviceDetails.materials.join(', ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Amount:</span>
                  <span className="text-sm font-semibold">${order.totalAmount}</span>
                </div>
              </div>

              {/* 客户评价 */}
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Customer Review</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        {i < order.customerReview.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-800">{order.customerReview.comment}</p>
                <p className="text-xs text-gray-600 mt-1">{order.customerReview.date}</p>
              </div>

              {/* 备注 */}
              {order.serviceDetails.notes && (
                <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-yellow-800">{order.serviceDetails.notes}</p>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  onClick={() => navigate(`/order/${order.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderHistory; 