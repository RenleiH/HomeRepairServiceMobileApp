import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../database/db';

const Login = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = db.loginUser(userType, formData.email, formData.password);
      login(user, userType);
      navigate(`/dashboard/${userType}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-full bg-white p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/main')}
          className="text-blue-500"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Login as {userType === 'homeowner' ? 'Home Owner' : 'Service Provider'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate(`/register/${userType}`)}
          className="w-full py-3 border border-blue-500 text-blue-500 rounded-lg"
        >
          Create New Account
        </button>
      </form>
    </div>
  );
};

export default Login; 