import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/FeedbackForm';

const ProviderProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  // Mock provider data
  const providerData = {
    name: 'John Smith',
    title: 'Professional Handyman',
    rating: 4.8,
    reviews: 142,
    totalOrders: 156,
    yearsOfExperience: 5,
    serviceTypes: ['Plumbing', 'Electrical', 'Carpentry'],
    certifications: [
      {
        name: 'Licensed Plumber',
        issuer: 'State Board of Plumbing',
        certificateNumber: 'PLB-2020-1234'
      }
    ],
    registration: {
      businessName: "Smith's Home Services",
      registrationNumber: 'REG123456',
      registrationDate: 'Jan 15, 2020',
      status: 'Active',
      businessType: 'Sole Proprietorship',
      taxId: 'TAX789012'
    }
  };

  if (showFeedbackForm) {
    return <FeedbackForm userType="provider" userId={user?.id} />;
  }

  return (
    <div className="h-full bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard/provider')}
              className="text-blue-600 hover:text-blue-700"
            >
              ←
            </button>
            <h1 className="ml-4 text-lg font-semibold">Provider Profile</h1>
          </div>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            💬 Feedback
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>👤</span>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">{providerData.name}</h2>
              <p className="text-gray-500">{providerData.title}</p>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <span className="text-yellow-400">⭐</span>
                <span className="font-medium">{providerData.rating}</span>
                <span className="text-gray-500">({providerData.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Registration Information</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Update
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{providerData.registration.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Number</p>
              <p className="font-medium">{providerData.registration.registrationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="font-medium">{providerData.registration.registrationDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{providerData.registration.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Business Type</p>
              <p className="font-medium">{providerData.registration.businessType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tax ID</p>
              <p className="font-medium">{providerData.registration.taxId}</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Certifications</h3>
            <button 
              onClick={() => setShowCertificationModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add New
            </button>
          </div>
          <div className="space-y-4">
            {providerData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-sm text-gray-500">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">Certificate No: {cert.certificateNumber}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Service Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="font-medium">{providerData.totalOrders}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Years of Experience</p>
              <p className="font-medium">{providerData.yearsOfExperience}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Service Types</p>
              <p className="font-medium">{providerData.serviceTypes.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Certification Modal */}
      {showCertificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Add New Certification</h2>
              <button 
                onClick={() => setShowCertificationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Certificate Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCertificationModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Add Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile; 