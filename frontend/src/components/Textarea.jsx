import React from 'react';

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  className = ''
}) => {
  // Uber Style: Clean and minimal design
  const getTextareaStyles = () => {
    return `
      w-full px-4 py-3 rounded-xl border
      focus:outline-none focus:ring-2 focus:ring-black
      transition-all duration-200
      resize-none
      ${error ? 'border-red-500' : 'border-gray-200'}
      ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    `;
  };

  // Fitts Law: Make interactive elements large enough and with sufficient spacing
  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={getTextareaStyles()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? `${label}-helper` : undefined}
      />
      {(error || helperText) && (
        <p 
          id={`${label}-helper`}
          className={`text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}
          role={error ? 'alert' : 'status'}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Textarea; 