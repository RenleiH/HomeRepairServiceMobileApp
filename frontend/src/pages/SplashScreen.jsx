import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">🔧</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">HomeRepair</h1>
      <p className="text-gray-600">Your trusted repair service platform</p>
    </div>
  );
};

export default SplashScreen; 