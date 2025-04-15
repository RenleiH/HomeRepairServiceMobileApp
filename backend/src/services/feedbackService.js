const storageService = require('./storageService');

const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      const feedback = storageService.addFeedback(feedbackData);
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw new Error('Failed to submit feedback');
    }
  },

  // Get user feedback
  getUserFeedback: async (userType, userId) => {
    try {
      const allFeedback = storageService.readFeedback();
      const userFeedback = allFeedback.filter(
        feedback => feedback.userType === userType && feedback.userId === userId
      );
      return { success: true, data: userFeedback };
    } catch (error) {
      console.error('Error getting user feedback:', error);
      throw new Error('Failed to get user feedback');
    }
  },

  // Get all feedback
  getAllFeedback: async () => {
    try {
      const feedback = storageService.readFeedback();
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting all feedback:', error);
      throw new Error('Failed to get all feedback');
    }
  }
};

module.exports = feedbackService; 