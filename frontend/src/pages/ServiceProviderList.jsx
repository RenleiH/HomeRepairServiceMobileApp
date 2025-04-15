import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceProviderList = () => {
  const navigate = useNavigate();
  const { serviceType } = useParams();
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' 或 'asc'

  // 将 providers 对象包装在 useMemo 中
  const providers = useMemo(() => ({
    plumbing: [
      {
        id: 'p1',
        name: 'John Smith',
        company: 'Quick Fix Plumbing',
        rating: 4.9,
        reviews: 128,
        hourlyRate: 75,
        availability: 'Available Today',
        image: null,
        badges: ['Licensed', 'Insured', 'Background Check'],
        experience: '15 years'
      },
      {
        id: 'p2',
        name: 'Mike Johnson',
        company: 'Pro Plumbers Inc',
        rating: 4.8,
        reviews: 89,
        hourlyRate: 65,
        availability: 'Available Tomorrow',
        image: null,
        badges: ['Licensed', 'Insured'],
        experience: '8 years'
      },
    ],
    electrical: [
      {
        id: 'e1',
        name: 'David Wilson',
        company: 'Electric Masters',
        rating: 5.0,
        reviews: 156,
        hourlyRate: 90,
        availability: 'Available Today',
        image: null,
        badges: ['Licensed', 'Insured', 'Master Electrician'],
        experience: '20 years'
      },
      {
        id: 'e2',
        name: 'Sarah Chen',
        company: 'PowerPro Electric',
        rating: 4.9,
        reviews: 94,
        hourlyRate: 85,
        availability: 'Next Week',
        image: null,
        badges: ['Licensed', 'Insured'],
        experience: '12 years'
      },
    ],
    hvac: [
      {
        id: 'h1',
        name: 'Robert Brown',
        company: 'Cool Comfort HVAC',
        rating: 4.8,
        reviews: 203,
        hourlyRate: 95,
        availability: 'Available Today',
        image: null,
        badges: ['Licensed', 'Insured', 'HVAC Certified'],
        experience: '18 years'
      },
    ],
    carpentry: [
      {
        id: 'c1',
        name: 'Tom Anderson',
        company: 'Master Woodworks',
        rating: 4.9,
        reviews: 167,
        hourlyRate: 85,
        availability: 'Available Today',
        image: null,
        badges: ['Licensed', 'Insured', 'Custom Work Specialist'],
        experience: '22 years',
        specialties: ['Custom Cabinets', 'Furniture Repair', 'Deck Building']
      },
      {
        id: 'c2',
        name: 'James Miller',
        company: 'Precision Carpentry',
        rating: 4.7,
        reviews: 143,
        hourlyRate: 75,
        availability: 'Available Tomorrow',
        image: null,
        badges: ['Licensed', 'Insured', 'Fine Woodworking'],
        experience: '15 years',
        specialties: ['Door Installation', 'Window Repair', 'Built-in Furniture']
      },
      {
        id: 'c3',
        name: 'Maria Garcia',
        company: 'Creative Woodcraft',
        rating: 4.8,
        reviews: 98,
        hourlyRate: 80,
        availability: 'Next Week',
        image: null,
        badges: ['Licensed', 'Custom Design'],
        experience: '12 years',
        specialties: ['Kitchen Remodeling', 'Staircase Building', 'Wood Flooring']
      }
    ],
    painting: [
      {
        id: 'p1',
        name: 'Steve Williams',
        company: 'Perfect Finish Painting',
        rating: 4.9,
        reviews: 215,
        hourlyRate: 65,
        availability: 'Available Today',
        image: null,
        badges: ['Licensed', 'Insured', 'Eco-Friendly'],
        experience: '18 years',
        specialties: ['Interior', 'Exterior', 'Decorative Painting']
      },
      {
        id: 'p2',
        name: 'Lisa Chen',
        company: 'Artistic Touch Painters',
        rating: 5.0,
        reviews: 178,
        hourlyRate: 70,
        availability: 'Available Tomorrow',
        image: null,
        badges: ['Licensed', 'Insured', 'Color Specialist'],
        experience: '10 years',
        specialties: ['Faux Finish', 'Murals', 'Cabinet Painting']
      },
      {
        id: 'p3',
        name: 'Marcus Johnson',
        company: 'Fresh Coat Pro',
        rating: 4.8,
        reviews: 145,
        hourlyRate: 60,
        availability: 'This Week',
        image: null,
        badges: ['Licensed', 'Commercial Certified'],
        experience: '14 years',
        specialties: ['Commercial', 'Residential', 'Pressure Washing']
      }
    ],
    cleaning: [
      {
        id: 'cl1',
        name: 'Emily Watson',
        company: 'Spotless Solutions',
        rating: 4.9,
        reviews: 312,
        hourlyRate: 45,
        availability: 'Available Today',
        image: null,
        badges: ['Insured', 'Eco-Friendly', 'Deep Clean Certified'],
        experience: '8 years',
        specialties: ['Deep Cleaning', 'Move-in/Move-out', 'Green Cleaning']
      },
      {
        id: 'cl2',
        name: 'Daniel Kim',
        company: 'Premium Clean Co.',
        rating: 4.8,
        reviews: 267,
        hourlyRate: 50,
        availability: 'Available Tomorrow',
        image: null,
        badges: ['Insured', 'Commercial Certified', 'OSHA Certified'],
        experience: '12 years',
        specialties: ['Commercial', 'Industrial', 'Post-Construction']
      },
      {
        id: 'cl3',
        name: 'Sarah Martinez',
        company: 'Eco Clean Team',
        rating: 4.9,
        reviews: 189,
        hourlyRate: 40,
        availability: 'This Week',
        image: null,
        badges: ['Insured', 'Green Certified', 'Pet-Friendly'],
        experience: '6 years',
        specialties: ['Residential', 'Pet-Friendly Cleaning', 'Natural Products']
      }
    ]
  }), []); // 空依赖数组，因为这些数据是静态的

  const serviceNames = {
    plumbing: 'Plumbing',
    electrical: 'Electrical',
    hvac: 'HVAC',
    carpentry: 'Carpentry',
    painting: 'Painting',
    cleaning: 'Cleaning'
  };

  // 使用 providers 的 useMemo
  const currentProviders = useMemo(() => {
    const filtered = providers[serviceType] || [];
    
    switch (sortBy) {
      case 'rating':
        return [...filtered].sort((a, b) => 
          sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
        );
      case 'price':
        return [...filtered].sort((a, b) => 
          sortOrder === 'asc' ? a.hourlyRate - b.hourlyRate : b.hourlyRate - a.hourlyRate
        );
      case 'experience':
        return [...filtered].sort((a, b) => 
          sortOrder === 'asc' ? a.experience - b.experience : b.experience - a.experience
        );
      default:
        return filtered;
    }
  }, [serviceType, sortBy, sortOrder, providers]);

  // 处理排序变化
  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // 如果点击相同的排序方式，切换排序方向
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 如果是新的排序方式，设置为默认的降序
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const ProviderCard = ({ provider }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4">
        {/* 供应商基本信息 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
              👨‍🔧
            </div>
            <div>
              <h3 className="font-semibold">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.company}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({provider.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <span className="text-green-600 text-sm font-medium">
            {provider.availability}
          </span>
        </div>

        {/* 徽章和经验 */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {provider.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Experience: {provider.experience}
          </p>
        </div>

        {/* 专业领域 */}
        {provider.specialties && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700">Specialties:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {provider.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 价格和选择按钮 */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">${provider.hourlyRate}</span>
            <span className="text-sm text-gray-500">/hour</span>
          </div>
          <button
            onClick={() => navigate(`/estimate-request/${provider.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col relative">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow">
        <button
          onClick={() => navigate('/create-order')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">{serviceNames[serviceType]} Services</h1>
        <div className="w-10"></div>
      </div>

      {/* 排序选项 */}
      <div className="p-4 bg-white border-b">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSortChange('rating')}
            className={`px-3 py-1 rounded-full text-sm ${
              sortBy === 'rating'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Rating {sortBy === 'rating' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
          <button
            onClick={() => handleSortChange('price')}
            className={`px-3 py-1 rounded-full text-sm ${
              sortBy === 'price'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Price {sortBy === 'price' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
          <button
            onClick={() => handleSortChange('experience')}
            className={`px-3 py-1 rounded-full text-sm ${
              sortBy === 'experience'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Experience {sortBy === 'experience' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
        </div>
      </div>

      {/* 结果统计 */}
      <div className="px-4 py-2 text-sm text-gray-600">
        Found {currentProviders.length} service providers
      </div>

      {/* 服务供应商列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {currentProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>

      {/* 如果没有找到供应商 */}
      {currentProviders.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No service providers found for this category.
        </div>
      )}
    </div>
  );
};

export default ServiceProviderList; 