const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Answered', 'Closed'],
    default: 'Open'
  },
  adminReply: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);