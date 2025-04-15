import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../database/db';
import FeedbackForm from '../components/FeedbackForm';

const HomeownerProfile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || '',
    avatar: user?.avatar || null
  });

  const handleSave = () => {
    const confirmSave = window.confirm('Are you sure you want to update your profile?');
    if (confirmSave) {
      // 更新用户信息
      const updatedUser = db.updateUser('homeowner', user.id, formData);
      login(updatedUser, 'homeowner');
      setIsEditing(false);
      navigate('/dashboard/homeowner');
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Are you sure you want to discard changes?');
    if (confirmCancel) {
      setIsEditing(false);
      navigate('/dashboard/homeowner');
    }
  };

  if (showFeedbackForm) {
    return <FeedbackForm userType="homeowner" userId={user?.id} />;
  }

  return (
    <div className="h-full bg-gray-50 overflow-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <div className="flex space-x-4">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="text-blue-500"
              >
                💬 Feedback
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* 头像部分 */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  👤
                </div>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 text-sm">
                📷
              </button>
            )}
          </div>
        </div>

        {/* 个人信息表单 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* 编辑模式下的按钮 */}
        {isEditing && (
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeownerProfile; 