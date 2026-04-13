const Ticket = require('../models/Ticket');

// User create new ticket
const createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({
      userId: req.body.userId, // Id user
      username: req.body.username,
      subject: req.body.subject,
      description: req.body.description
    });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully.', ticket: newTicket });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User get their own tickets
const getUserTickets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tickets = await Ticket.find({ userId: userId }).sort({ createdAt: -1 }); // sort by newest first
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin
const replyTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { adminReply } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { 
        adminReply: adminReply,
        status: 'Answered' // auto change status to "Answered" when admin replies
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    res.status(200).json({ message: 'Successfully replied to the ticket.', ticket: updatedTicket });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createTicket, getUserTickets, getAllTickets, replyTicket };