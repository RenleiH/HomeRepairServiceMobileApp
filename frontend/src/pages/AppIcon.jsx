import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppIcon = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-black">
      <div className="h-full flex items-center justify-center">
        <button 
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          onClick={() => navigate('/splash')}
        >
          <span className="text-white text-3xl">🔧</span>
        </button>
      </div>
      
      {/* 底部指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600/50 rounded-full"></div>
    </div>
  );
};

export default AppIcon; 