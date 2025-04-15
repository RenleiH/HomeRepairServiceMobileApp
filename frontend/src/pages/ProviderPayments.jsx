import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderPayments = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // 模拟支付数据
  const paymentData = {
    balance: 2850.00,
    pendingPayments: 450.00,
    totalEarnings: 3300.00,
    transactions: [
      {
        id: 'TRX001',
        type: 'Payment',
        amount: 180.00,
        date: '2024-03-15',
        status: 'Completed',
        orderId: 'ORD001',
        customer: 'Charlie Brown',
        description: 'Bathroom faucet repair'
      },
      {
        id: 'TRX002',
        type: 'Payment',
        amount: 450.00,
        date: '2024-03-10',
        status: 'Completed',
        orderId: 'ORD002',
        customer: 'Diana Ross',
        description: 'Kitchen pipe replacement'
      },
      {
        id: 'TRX003',
        type: 'Withdrawal',
        amount: -2000.00,
        date: '2024-03-05',
        status: 'Completed',
        orderId: null,
        customer: null,
        description: 'Bank transfer'
      }
    ]
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
        <button
          onClick={() => navigate('/dashboard/provider')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Payments</h1>
        <div className="w-10"></div>
      </div>

      {/* 余额卡片 */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-sm opacity-80">Available Balance</h2>
          <p className="text-3xl font-bold mt-2">${paymentData.balance.toFixed(2)}</p>
          <button
            onClick={() => navigate('/withdraw')}
            className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Pending Payments</h3>
          <p className="text-2xl font-semibold">${paymentData.pendingPayments.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Total Earnings</h3>
          <p className="text-2xl font-semibold">${paymentData.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* 交易记录 */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Transaction History</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="All Time">All Time</option>
            </select>
          </div>

          <div className="space-y-4">
            {paymentData.transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'Payment' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'Payment' ? '💰' : '💳'}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'Payment' 
                        ? `Payment from ${transaction.customer}`
                        : 'Withdrawal'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="bg-white p-4 border-t">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/payment-settings')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Payment Settings
          </button>
          <button
            onClick={() => navigate('/payment-reports')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderPayments; 