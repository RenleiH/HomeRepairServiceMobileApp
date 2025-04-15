const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/aiService');

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await generateAIResponse(message);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 