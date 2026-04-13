const express = require('express');
const router = express.Router();
const { getAllResponses, getOneResponse, createResponse, updateResponse, deleteResponse } = require('../controllers/responseController');

router.get('/', getAllResponses);
router.get('/:id', getOneResponse);
router.post('/', createResponse);
router.put('/:id', updateResponse);
router.delete('/:id', deleteResponse);

module.exports = router;