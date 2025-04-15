import api from './api';

export const generateAIResponse = async (message) => {
  try {
    return await api.ai.chat(message);
  } catch (error) {
    console.error('AI Service Error:', error);
    return 'I apologize, but I am having trouble connecting to the service. Please try again later.';
  }
}; 