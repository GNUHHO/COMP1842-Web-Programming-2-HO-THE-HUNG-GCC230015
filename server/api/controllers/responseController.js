const HelpdeskResponse = require('../models/HelpdeskResponse');

const getAllResponses = async (req, res) => {
  try {
    const allResponses = await HelpdeskResponse.find(); 
    res.status(200).json(allResponses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneResponse = async (req, res) => {
  try {
    const entry = await HelpdeskResponse.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResponse = async (req, res) => {
  try {
    const newEntry = new HelpdeskResponse(req.body); 
    const savedEntry = await newEntry.save(); 
    res.status(201).json(savedEntry); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateResponse = async (req, res) => {
  try {
    const updatedEntry = await HelpdeskResponse.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Cannot find a response with that ID' });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const deletedEntry = await HelpdeskResponse.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Cannot find a response with that ID' });
    }
    res.status(200).json({ message: 'Helpdesk response deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllResponses, getOneResponse, createResponse, updateResponse, deleteResponse };