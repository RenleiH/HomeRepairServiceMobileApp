import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 模拟已保存的支付方式
  const [savedPaymentMethods] = useState([
    {
      id: '1',
      type: 'credit',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/25',
      cardHolder: 'John Smith',
      isDefault: true,
      brand: 'Visa'
    }
  ]);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // 处理删除逻辑
    setShowDeleteConfirm(false);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow sticky top-0 z-10">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Payment Methods</h1>
        <div className="w-10"></div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        {/* 已保存的支付方式 */}
        <div className="p-4 space-y-4">
          {savedPaymentMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {method.brand === 'Visa' && (
                    <div className="text-2xl">💳</div>
                  )}
                  <div>
                    <h3 className="font-medium">{method.brand}</h3>
                    <p className="text-gray-600">{method.cardNumber}</p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>Card Holder: {method.cardHolder}</p>
                <p>Expires: {method.expiryDate}</p>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
                <button
                  onClick={handleDelete}
                  className="text-red-500 text-sm hover:text-red-600"
                >
                  Delete Card
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 添加新支付方式按钮 */}
        <div className="p-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-white border border-gray-200 text-blue-500 rounded-xl p-4 flex items-center justify-center space-x-2 hover:bg-gray-50"
          >
            <span className="text-xl">+</span>
            <span>Add New Payment Method</span>
          </button>
        </div>
      </div>

      {/* 固定的返回按钮 */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 hover:bg-blue-50 active:transform active:scale-95 transition-all border border-gray-100"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 mx-4 w-full max-w-[300px]">
            <h3 className="text-lg font-semibold mb-2">Delete Payment Method</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this payment method? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加新支付方式弹窗 */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 mx-4 w-full max-h-[90%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Payment Method</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="setDefault"
                  className="mr-2"
                />
                <label htmlFor="setDefault" className="text-sm text-gray-600">
                  Set as default payment method
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm mt-4"
              >
                Add Card
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods; 