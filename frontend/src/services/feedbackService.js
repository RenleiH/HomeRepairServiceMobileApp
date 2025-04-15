import api from './api';

export const feedbackService = {
  // 提交反馈
  submitFeedback: async (feedbackData) => {
    try {
      const feedback = await api.feedback.submit(feedbackData);
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { success: false, error: error.message };
    }
  },

  // 获取用户反馈
  getUserFeedback: async (userType, userId) => {
    try {
      const feedback = await api.feedback.getUserFeedback(userType, userId);
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting user feedback:', error);
      return { success: false, error: error.message };
    }
  },

  // 获取所有反馈
  getAllFeedback: async () => {
    try {
      const feedback = await api.feedback.getAllFeedback();
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting all feedback:', error);
      return { success: false, error: error.message };
    }
  }
}; 