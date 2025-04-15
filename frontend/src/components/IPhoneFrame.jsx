import React from 'react';

const IPhoneFrame = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4">
      {/* iPhone 外壳 */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] p-4 shadow-2xl">
        {/* 顶部刘海 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[30px] bg-black rounded-b-3xl z-20">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[25%] h-[4px] bg-gray-800 rounded-full"></div>
        </div>
        
        {/* 电源键 */}
        <div className="absolute right-[-4px] top-[120px] w-[4px] h-[80px] bg-gray-700 rounded-r-lg"></div>
        
        {/* 音量键 */}
        <div className="absolute left-[-4px] top-[100px] w-[4px] h-[40px] bg-gray-700 rounded-l-lg"></div>
        <div className="absolute left-[-4px] top-[160px] w-[4px] h-[40px] bg-gray-700 rounded-l-lg"></div>
        
        {/* 屏幕 */}
        <div className="w-full h-full bg-white rounded-[45px] overflow-hidden relative">
          {/* 状态栏 */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex justify-between items-center px-6 pt-1">
            <div className="text-white text-xs">12:00</div>
            <div className="flex items-center space-x-2">
              <div className="text-white text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                </svg>
              </div>
              <div className="text-white text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* 主要内容区域 */}
          <div className="h-full pt-6 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneFrame; 