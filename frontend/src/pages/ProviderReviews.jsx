import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderReviews = () => {
  const navigate = useNavigate();
  const [filterRating, setFilterRating] = useState('All');

  // 模拟评价数据
  const reviews = [
    {
      id: 'REV001',
      orderId: 'ORD001',
      serviceType: 'Plumbing',
      customer: {
        name: 'Alice Johnson',
        photo: null,
        rating: 4.8
      },
      orderDate: '2024-03-15',
      reviewDate: '2024-03-16',
      rating: 5,
      review: 'Excellent service! John fixed the leaking pipe quickly and explained everything thoroughly. The price was reasonable and the work quality was outstanding. Highly recommend!',
      photos: ['repair1.jpg', 'repair2.jpg'],
      serviceDetails: 'Leaking Pipe Repair',
      cost: 180,
      likes: 12,
      helpful: 8,
      response: {
        text: 'Thank you for your kind review! We strive to provide the best service possible. Looking forward to serving you again!',
        date: '2024-03-17'
      }
    },
    {
      id: 'REV002',
      orderId: 'ORD002',
      serviceType: 'Plumbing',
      customer: {
        name: 'Bob Wilson',
        photo: null,
        rating: 4.9
      },
      orderDate: '2024-03-10',
      reviewDate: '2024-03-11',
      rating: 4,
      review: 'Good service overall. The plumber was professional and completed the work on time. Only suggestion would be better communication about arrival time.',
      photos: ['sink1.jpg'],
      serviceDetails: 'Kitchen Sink Installation',
      cost: 250,
      likes: 5,
      helpful: 3,
      response: {
        text: 'Thank you for your feedback! We\'ll improve our scheduling communication to provide an even better service experience.',
        date: '2024-03-12'
      }
    }
  ];

  // 计算平均评分
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  // 根据评分筛选评价
  const filteredReviews = filterRating === 'All'
    ? reviews
    : reviews.filter(review => review.rating === parseInt(filterRating));

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
        <h1 className="text-lg font-semibold">Reviews</h1>
        <div className="w-10"></div>
      </div>

      {/* 评分概览 */}
      <div className="bg-white p-4 mx-4 mt-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{averageRating}</h2>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  {i < Math.round(averageRating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-1">{reviews.length} reviews</p>
          </div>
          <div className="text-right">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* 评价列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{review.serviceType}</h3>
                  <p className="text-sm text-gray-600">{review.serviceDetails}</p>
                </div>
                <span className="text-sm text-gray-500">{review.reviewDate}</span>
              </div>

              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p className="font-medium">{review.customer.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < review.rating ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-800 mb-3">{review.review}</p>
              
              {/* 服务详情 */}
              <div className="text-sm text-gray-600 mb-3">
                <p>Order: #{review.orderId}</p>
                <p>Cost: ${review.cost}</p>
              </div>

              {/* 照片 */}
              {review.photos.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {review.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      📷
                    </div>
                  ))}
                </div>
              )}

              {/* 提供商回复 */}
              {review.response && (
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm text-gray-600">Your Response:</p>
                  <p className="text-sm mt-1">{review.response.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{review.response.date}</p>
                </div>
              )}

              {/* 互动数据 */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{review.likes}</span>
                  </button>
                  <span>{review.helpful} found this helpful</span>
                </div>
                <button className="text-blue-500">Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderReviews; 