import React from 'react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  // Uber Style: Bold and clean design
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500';
      case 'secondary':
        return 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      default:
        return 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500';
    }
  };

  // Uber Style: Consistent sizing
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm font-medium';
      case 'medium':
        return 'px-6 py-3 text-base font-semibold';
      case 'large':
        return 'px-8 py-4 text-lg font-bold';
      default:
        return 'px-6 py-3 text-base font-semibold';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-full font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200
        active:scale-98
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button; 