const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Ensure feedback file exists
if (!fs.existsSync(FEEDBACK_FILE)) {
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify([]));
}

const storageService = {
  // Read all feedback
  readFeedback: () => {
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    return JSON.parse(data);
  },

  // Write feedback
  writeFeedback: (feedback) => {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
  },

  // Add new feedback
  addFeedback: (newFeedback) => {
    const feedback = storageService.readFeedback();
    feedback.push({
      ...newFeedback,
      id: Date.now().toString(), // Use timestamp as ID
      createdAt: new Date().toISOString()
    });
    storageService.writeFeedback(feedback);
    return feedback[feedback.length - 1];
  }
};

module.exports = storageService; 