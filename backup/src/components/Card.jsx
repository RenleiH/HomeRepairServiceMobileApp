import React from 'react';

const Card = ({ 
  children, 
  onClick, 
  hover = true, 
  className = '',
  status,
  statusColor = 'blue'
}) => {
  // Uber Style: Clean and minimal design
  const getStatusColor = () => {
    switch (statusColor) {
      case 'green': return 'text-green-600 bg-green-50';
      case 'red': return 'text-red-600 bg-red-50';
      case 'yellow': return 'text-yellow-600 bg-yellow-50';
      case 'blue': return 'text-blue-600 bg-blue-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  // Fitts Law: Make interactive elements large enough and with sufficient spacing
  return (
    <div 
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl bg-white
        ${hover ? 'hover:shadow-lg transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer active:scale-98' : ''}
        ${className}
      `}
    >
      {children}
      {status && (
        <div className={`
          absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium
          ${getStatusColor()}
        `}>
          {status}
        </div>
      )}
    </div>
  );
};

export default Card; 