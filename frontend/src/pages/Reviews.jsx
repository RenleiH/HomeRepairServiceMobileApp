import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {
  const navigate = useNavigate();
  const [filterRating, setFilterRating] = useState('All');

  // Mock review data
  const reviews = [
    {
      id: 'REV001',
      serviceType: 'Plumbing',
      provider: {
        name: 'John Smith',
        company: 'Quick Fix Plumbing',
        photo: null,
        overallRating: 4.8
      },
      orderDate: '2024-04-01',
      reviewDate: '2024-04-02',
      rating: 5,
      review: 'Excellent service! John fixed the leaking pipe quickly and explained everything thoroughly. The price was reasonable and the work quality was outstanding. Highly recommend!',
      photos: ['repair1.jpg', 'repair2.jpg'],
      serviceDetails: 'Leaking Pipe Repair',
      cost: 180,
      likes: 12,
      helpful: 8,
      response: {
        text: 'Thank you for your kind review! We strive to provide the best service possible. Looking forward to serving you again!',
        date: '2024-04-03'
      }
    },
    {
      id: 'REV002',
      serviceType: 'Carpentry',
      provider: {
        name: 'Tom Anderson',
        company: 'Master Woodworks',
        photo: null,
        overallRating: 4.9
      },
      orderDate: '2024-03-25',
      reviewDate: '2024-03-26',
      rating: 5,
      review: 'The custom cabinets exceeded my expectations! Tom\'s craftsmanship is exceptional, and the design is both beautiful and functional. Installation was meticulous with no mess left behind. Worth every penny!',
      photos: ['cabinet1.jpg', 'cabinet2.jpg', 'cabinet3.jpg'],
      serviceDetails: 'Custom Kitchen Cabinet Installation',
      cost: 2800,
      likes: 25,
      helpful: 15,
      response: {
        text: 'Thank you for your detailed review! We\'re delighted to have met your expectations. Your kitchen project is one of our proudest achievements.',
        date: '2024-03-27'
      }
    },
    {
      id: 'REV003',
      serviceType: 'Cleaning',
      provider: {
        name: 'Emily Watson',
        company: 'Spotless Solutions',
        photo: null,
        overallRating: 4.9
      },
      orderDate: '2024-03-15',
      reviewDate: '2024-03-15',
      rating: 4,
      review: 'Emily\'s cleaning service was very professional, especially with deep cleaning details. Love that they use eco-friendly products. Only suggestion would be better communication about arrival time.',
      photos: ['cleaning1.jpg'],
      serviceDetails: 'Deep House Cleaning',
      cost: 200,
      likes: 8,
      helpful: 6,
      response: {
        text: 'Thank you for your feedback! We\'ll improve our scheduling communication to provide an even better service experience.',
        date: '2024-03-16'
      }
    },
    {
      id: 'REV004',
      serviceType: 'Painting',
      provider: {
        name: 'Lisa Chen',
        company: 'Artistic Touch Painters',
        photo: null,
        overallRating: 5.0
      },
      orderDate: '2024-03-10',
      reviewDate: '2024-03-11',
      rating: 5,
      review: 'Lisa\'s team was incredibly professional! They did a perfect job with the walls and were very careful with protecting furniture and floors. Their color recommendations were spot-on. My living room looks amazing!',
      photos: ['painting1.jpg', 'painting2.jpg'],
      serviceDetails: 'Living Room Wall Painting',
      cost: 650,
      likes: 18,
      helpful: 12,
      response: {
        text: 'Thank you for your wonderful review! We\'re so glad we could help create your ideal living space.',
        date: '2024-03-12'
      }
    }
  ];

  // Calculate average rating
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

  // Filter reviews based on selected rating
  const getFilteredReviews = () => {
    if (filterRating === 'All') {
      return reviews;
    }
    const ratingNumber = parseInt(filterRating);
    return reviews.filter(review => review.rating === ratingNumber);
  };

  // Get filtered reviews
  const filteredReviews = getFilteredReviews();

  return (
    <div className="h-full flex flex-col relative">
      {/* 顶部导航栏 - 固定在顶部 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow sticky top-0 z-10">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">My Reviews</h1>
        <div className="w-10"></div>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        {/* Reviews 统计 */}
        <div className="bg-white p-4 mt-2 mx-4 rounded-xl shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-xl font-semibold">{reviews.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-xl font-semibold flex items-center justify-center">
                {averageRating} <span className="text-yellow-400 ml-1">★</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Likes</p>
              <p className="text-xl font-semibold">
                {reviews.reduce((sum, review) => sum + review.likes, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Filter options */}
        <div className="p-4 flex gap-2 overflow-x-auto">
          {['All', '5', '4', '3', '2', '1'].map((rating) => (
            <button
              key={rating}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                filterRating === rating 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setFilterRating(rating)}
            >
              {rating === 'All' ? 'All Reviews' : `${rating} Stars`}
            </button>
          ))}
        </div>

        {/* Reviews 列表 */}
        <div className="p-4 space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews found for this rating
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Provider Information */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        👨‍🔧
                      </div>
                      <div>
                        <h3 className="font-medium">{review.provider.name}</h3>
                        <p className="text-sm text-gray-600">{review.provider.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{review.reviewDate}</p>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-4 space-y-3">
                  <p className="text-gray-800">{review.review}</p>
                  
                  {/* Service Details */}
                  <div className="text-sm text-gray-600">
                    <p>Service: {review.serviceDetails}</p>
                    <p>Cost: ${review.cost}</p>
                  </div>

                  {/* Photos */}
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mt-2">
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

                  {/* Provider Response */}
                  {review.response && (
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <p className="text-sm text-gray-600">Provider Response:</p>
                      <p className="text-sm mt-1">{review.response.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{review.response.date}</p>
                    </div>
                  )}

                  {/* Interaction Data */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
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
              </div>
            ))
          )}
        </div>
      </div>

      {/* 固定在底部的返回按钮 */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => navigate('/dashboard/homeowner')}
          className="bg-white text-blue-500 px-4 py-2 rounded-full shadow-lg flex items-center space-x-1 hover:bg-blue-50 active:transform active:scale-95 transition-all border border-gray-100"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default Reviews; 