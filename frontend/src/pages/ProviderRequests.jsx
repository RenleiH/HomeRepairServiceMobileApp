import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderRequests = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');

  // 模拟服务请求数据
  const requests = [
    {
      id: 'REQ001',
      serviceType: 'Plumbing',
      customer: {
        name: 'Alice Johnson',
        photo: null,
        rating: 4.8
      },
      location: '123 Main St, City',
      description: 'Need to replace an old water heater that\'s leaking.',
      photos: ['heater1.jpg', 'heater2.jpg'],
      createdAt: '2024-03-20 10:30',
      status: 'Pending',
      urgency: 'High',
      preferredDate: '2024-03-22',
      preferredTime: 'Morning',
      budget: {
        min: 500,
        max: 1000
      }
    },
    {
      id: 'REQ002',
      serviceType: 'Plumbing',
      customer: {
        name: 'Bob Wilson',
        photo: null,
        rating: 4.9
      },
      location: '456 Oak Ave, City',
      description: 'Kitchen sink is clogged and water is draining slowly.',
      photos: ['sink1.jpg'],
      createdAt: '2024-03-20 09:15',
      status: 'Pending',
      urgency: 'Medium',
      preferredDate: '2024-03-21',
      preferredTime: 'Afternoon',
      budget: {
        min: 100,
        max: 300
      }
    }
  ];

  // 根据状态筛选请求
  const filteredRequests = filterStatus === 'All'
    ? requests
    : requests.filter(request => request.status === filterStatus);

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
        <h1 className="text-lg font-semibold">Service Requests</h1>
        <div className="w-10"></div>
      </div>

      {/* 筛选器 */}
      <div className="bg-white p-4 mx-4 mt-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filter Requests</h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value="All">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="Responded">Responded</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* 请求列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredRequests.map(request => (
            <div key={request.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{request.serviceType}</h3>
                  <p className="text-sm text-gray-600">{request.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  request.urgency === 'High' ? 'bg-red-100 text-red-800' :
                  request.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {request.urgency} Priority
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p className="font-medium">{request.customer.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < Math.round(request.customer.rating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mb-3">{request.description}</p>
              
              {/* 照片预览 */}
              {request.photos.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {request.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      📷
                    </div>
                  ))}
                </div>
              )}

              {/* 请求详情 */}
              <div className="text-sm text-gray-600 mb-3">
                <p>Created: {request.createdAt}</p>
                <p>Preferred: {request.preferredDate} {request.preferredTime}</p>
                <p>Budget: ${request.budget.min} - ${request.budget.max}</p>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  onClick={() => navigate(`/estimate-request/${request.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Respond
                </button>
                <button
                  onClick={() => navigate(`/request/${request.id}`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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

export default ProviderRequests; 