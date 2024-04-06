const express = require('express');
const router = express.Router();

// Import your authentication controller
const { LoginClient, LoginFreelancer } = require('../controllers/UserLoginController');

// Define routes for user authentication
router.post('/client', LoginClient);
router.post('/freelancer', LoginFreelancer)

module.exports = router;
