const express = require('express');
const userController = require('../controllers/userController');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.get('/getUserInfo',authorize.auth,userController.userInformation);

module.exports = router; 