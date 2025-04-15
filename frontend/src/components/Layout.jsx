import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, title, showBack = false, showProfile = true }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-gray-50">
      {/* 顶部导航栏 - 遵循 Fitts' Law，增大点击区域 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBack && (
              <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-xl">←</span>
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          {showProfile && (
            <div 
              onClick={() => navigate('/homeowner/profile')}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <span className="text-xl">👤</span>
            </div>
          )}
        </div>
      </div>

      {/* 主要内容区域 - 使用卡片式布局，增加视觉层次 */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout; 