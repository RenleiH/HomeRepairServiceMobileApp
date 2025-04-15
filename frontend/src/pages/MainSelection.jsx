import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Welcome to HomeRepair</h1>
      
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => navigate('/login/homeowner')}
          className="w-full py-4 px-6 bg-blue-500 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          I'm a Home Owner
        </button>
        
        <button
          onClick={() => navigate('/login/provider')}
          className="w-full py-4 px-6 bg-green-500 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
        >
          I'm a Service Provider
        </button>
      </div>
    </div>
  );
};

export default MainSelection; 