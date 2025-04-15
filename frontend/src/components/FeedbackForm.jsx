import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService';

const FeedbackForm = ({ userType, userId }) => {
  const navigate = useNavigate();

  // Function to handle navigation with refresh
  const handleNavigation = () => {
    navigate(`/${userType}/profile`);
    // Short delay before refreshing to ensure navigation is complete
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: '',
    userType: userType,
    userId: userId
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await feedbackService.submitFeedback(feedback);
      if (result.success) {
        setShowThankYou(true);
        // Display thank you message for 3 seconds before redirecting
        setTimeout(() => {
          handleNavigation();
        }, 3000);
      } else {
        setError(result.error || 'Failed to submit feedback');
      }
    } catch (error) {
      setError('An error occurred while submitting feedback');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4 text-6xl">🎉</div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-gray-600">Your feedback has been submitted successfully.</p>
        <p className="text-gray-500 mt-2">Redirecting back to profile...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow mb-6">
        <button
          onClick={handleNavigation}
          className="text-blue-500"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Submit Feedback</h1>
        <div className="w-10"></div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating
            </label>
            <select
              value={feedback.rating}
              onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Comments
            </label>
            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Please provide your feedback..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleNavigation}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm; 