import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderAdvertising = () => {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState('All');

  // 模拟广告数据
  const advertisingData = {
    totalBudget: 500.00,
    spentBudget: 285.00,
    activeCampaigns: 2,
    totalImpressions: 12500,
    totalClicks: 450,
    campaigns: [
      {
        id: 'CAM001',
        name: 'Spring Plumbing Special',
        status: 'Active',
        budget: 300.00,
        spent: 180.00,
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        impressions: 7500,
        clicks: 280,
        conversions: 15,
        ctr: '3.7%',
        cpc: '$0.64',
        targetAudience: 'Homeowners',
        serviceTypes: ['Plumbing', 'Repairs'],
        locations: ['City Center', 'Suburbs']
      },
      {
        id: 'CAM002',
        name: 'Emergency Services Promotion',
        status: 'Active',
        budget: 200.00,
        spent: 105.00,
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        impressions: 5000,
        clicks: 170,
        conversions: 8,
        ctr: '3.4%',
        cpc: '$0.62',
        targetAudience: 'Property Managers',
        serviceTypes: ['Emergency Services'],
        locations: ['All Areas']
      }
    ]
  };

  // 计算统计数据
  const stats = {
    remainingBudget: advertisingData.totalBudget - advertisingData.spentBudget,
    conversionRate: ((advertisingData.campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0) / 
                     advertisingData.campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)) * 100).toFixed(1),
    averageCTR: (advertisingData.campaigns.reduce((sum, campaign) => sum + parseFloat(campaign.ctr), 0) / 
                 advertisingData.campaigns.length).toFixed(1),
    averageCPC: (advertisingData.campaigns.reduce((sum, campaign) => sum + parseFloat(campaign.cpc.replace('$', '')), 0) / 
                 advertisingData.campaigns.length).toFixed(2)
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
        <h1 className="text-lg font-semibold">Advertising</h1>
        <div className="w-10"></div>
      </div>

      {/* 预算概览 */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-sm opacity-80">Campaign Budget</h2>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-3xl font-bold">${advertisingData.totalBudget.toFixed(2)}</p>
              <p className="text-sm opacity-80 mt-1">Total Budget</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${stats.remainingBudget.toFixed(2)}</p>
              <p className="text-sm opacity-80 mt-1">Remaining</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/create-campaign')}
            className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50"
          >
            Create New Campaign
          </button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Active Campaigns</h3>
          <p className="text-2xl font-semibold">{advertisingData.activeCampaigns}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Total Impressions</h3>
          <p className="text-2xl font-semibold">{advertisingData.totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Conversion Rate</h3>
          <p className="text-2xl font-semibold">{stats.conversionRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm text-gray-600">Avg. CTR</h3>
          <p className="text-2xl font-semibold">{stats.averageCTR}%</p>
        </div>
      </div>

      {/* 广告活动列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-4 mx-4 rounded-xl shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Campaigns</h2>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="All">All Campaigns</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="space-y-4">
            {advertisingData.campaigns.map(campaign => (
              <div key={campaign.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">
                      {campaign.startDate} - {campaign.endDate}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>

                {/* 预算进度 */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Spent</span>
                    <span>${campaign.spent.toFixed(2)} / ${campaign.budget.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* 活动指标 */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Impressions</p>
                    <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clicks</p>
                    <p className="font-medium">{campaign.clicks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conversions</p>
                    <p className="font-medium">{campaign.conversions}</p>
                  </div>
                </div>

                {/* 目标受众和服务类型 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {campaign.targetAudience}
                  </span>
                  {campaign.serviceTypes.map(type => (
                    <span key={type} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                  {campaign.locations.map(location => (
                    <span key={location} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {location}
                    </span>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-2 pt-3">
                  <button
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/campaign/${campaign.id}/edit`)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>
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
            onClick={() => navigate('/advertising-analytics')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Analytics
          </button>
          <button
            onClick={() => navigate('/advertising-settings')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderAdvertising; 