const express = require('express');
const router = express.Router();
const feedbackService = require('../services/feedbackService');

// 提交反馈
router.post('/', async (req, res) => {
  try {
    const result = await feedbackService.submitFeedback(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取用户反馈
router.get('/user/:userType/:userId', async (req, res) => {
  try {
    const { userType, userId } = req.params;
    const result = await feedbackService.getUserFeedback(userType, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取所有反馈
router.get('/', async (req, res) => {
  try {
    const result = await feedbackService.getAllFeedback();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 