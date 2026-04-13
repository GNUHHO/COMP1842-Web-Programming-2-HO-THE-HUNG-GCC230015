const express = require('express');
const router = express.Router();
const { 
  createTicket, 
  getUserTickets, 
  getAllTickets, 
  replyTicket 
} = require('../controllers/ticketController');

// User create new ticket
// Post request to /api/tickets with body { userId, username, subject, description }
router.post('/', createTicket);

// User get their own tickets
// GET request to /api/tickets/user/12345 to fetch the list of tickets for user with ID 12345
router.get('/user/:userId', getUserTickets);

// Admin get all tickets
// GET request to /api/tickets to fetch the list of all tickets
router.get('/', getAllTickets);

// Admin reply to a ticket
// PUT request to /api/tickets/abcde/reply to reply to the ticket with ID abcde
router.put('/:id/reply', replyTicket);

module.exports = router;