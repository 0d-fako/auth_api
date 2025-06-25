const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../middleware/authMiddleware');


router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);


router.get('/profile', verifyToken, authController.getUserProfile);

module.exports = router;