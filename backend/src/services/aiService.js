const fetch = require('node-fetch');
require('dotenv').config();

const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

if (!API_KEY) {
  console.error('Error: DEEPSEEK_API_KEY is not set in environment variables');
  process.exit(1);
}

const formatResponse = (content) => {
  // 将内容按段落分割
  const paragraphs = content.split(/\d+\.\s+/);
  
  // 移除空段落
  const validParagraphs = paragraphs.filter(p => p.trim());
  
  // 格式化每个段落
  const formattedContent = validParagraphs.map((p, index) => {
    if (index === 0) return p.trim(); // 第一段通常是开场白
    
    // 提取并格式化重点内容
    const boldContent = p.match(/\*\*(.*?)\*\*/);
    const mainContent = p.replace(/\*\*/g, '');
    
    return `${index}. ${boldContent ? `【${boldContent[1]}】` : ''} ${mainContent.trim()}`;
  }).join('\n\n');
  
  return formattedContent;
};

const generateAIResponse = async (message) => {
  try {
    console.log('Using API Key:', API_KEY ? 'Present' : 'Missing');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful customer service assistant for a home repair service platform. You help users with questions about services, bookings, and general platform usage. Be professional, friendly, and concise.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid API response format');
    }

    // 格式化 AI 响应
    const rawContent = data.choices[0].message.content;
    return formatResponse(rawContent);
  } catch (error) {
    console.error('AI Service Error:', error);
    return 'I apologize, but I am having trouble connecting to the service. Please try again later.';
  }
};

module.exports = {
  generateAIResponse
}; 