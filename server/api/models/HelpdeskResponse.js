const mongoose = require('mongoose');

const helpdeskResponseSchema = new mongoose.Schema({
  key: { // Error code or response key
    type: String,
    required: true,
    unique: true
  },
  value: { // Corresponding solution or response message
    type: String,
    required: true
  },
  category: { 
    type: String,
    enum: ['Account', 'Billing', 'Network', 'Hardware', 'Software', 'Other'],
    default: 'Other'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HelpdeskResponse', helpdeskResponseSchema);