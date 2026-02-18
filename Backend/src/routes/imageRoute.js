const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// URL: POST http://localhost:5000/api/images/generate
router.post('/generate', imageController.createCampaignImage);

module.exports = router;