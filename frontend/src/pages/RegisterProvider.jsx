import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../database/db';
import { useAuth } from '../context/AuthContext';

const RegisterProvider = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    businessLicense: null,
    driversLicense: null,
    insuranceCertificate: null,
    creditCard: '',
    bankAccount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = db.registerUser('provider', formData);
      login(user, 'provider');
      navigate('/dashboard/provider');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-full bg-white p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/login/provider')}
          className="text-blue-500"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Create Service Provider Account
      </h1>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Step {step} of 3</span>
          <span className="text-sm text-gray-600">{step * 33}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${step * 33}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 bg-green-500 text-white rounded-lg"
          >
            Next
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business License *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <button type="button" className="text-green-500">
                Upload Business License
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Driver's License *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <button type="button" className="text-green-500">
                Upload Driver's License
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Certificate *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <button type="button" className="text-green-500">
                Upload Insurance Certificate
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full py-3 bg-green-500 text-white rounded-lg"
          >
            Next
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Card Information *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter credit card number"
              value={formData.creditCard}
              onChange={(e) => setFormData({...formData, creditCard: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Account for Payments *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter bank account number"
              value={formData.bankAccount}
              onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg"
          >
            Complete Registration
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterProvider; 