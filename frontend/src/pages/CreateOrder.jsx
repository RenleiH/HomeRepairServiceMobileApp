import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const navigate = useNavigate();

  // 服务类型数据
  const serviceTypes = [
    {
      id: 'plumbing',
      icon: '🚰',
      title: 'Plumbing',
      description: 'Leaks, repairs, installations',
    },
    {
      id: 'electrical',
      icon: '⚡',
      title: 'Electrical',
      description: 'Wiring, fixtures, repairs',
    },
    {
      id: 'hvac',
      icon: '❄️',
      title: 'HVAC',
      description: 'Heating, cooling, maintenance',
    },
    {
      id: 'carpentry',
      icon: '🔨',
      title: 'Carpentry',
      description: 'Repairs, installations, custom work',
    },
    {
      id: 'painting',
      icon: '🎨',
      title: 'Painting',
      description: 'Interior & exterior painting',
    },
    {
      id: 'cleaning',
      icon: '🧹',
      title: 'Cleaning',
      description: 'Deep cleaning, maintenance',
    }
  ];

  const handleServiceSelect = (serviceId) => {
    navigate(`/service-providers/${serviceId}`);
  };

  return (
    <div className="h-full bg-gray-50 pb-16">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Create New Order</h1>
        <div className="w-10"></div>
      </div>

      {/* 服务类型选择 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">What service do you need?</h2>
        <div className="grid grid-cols-2 gap-4">
          {serviceTypes.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceSelect(service.id)}
              className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:bg-gray-50 active:transform active:scale-95 transition-all"
            >
              <span className="text-3xl mb-2">{service.icon}</span>
              <span className="font-medium mb-1">{service.title}</span>
              <span className="text-sm text-gray-500">{service.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 添加固定的返回按钮 */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 hover:bg-blue-50 active:transform active:scale-95 transition-all"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default CreateOrder; 