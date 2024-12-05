const express = require('express');
const { register, login, getUsers } = require('../controllers/userController');
const auth = require('../authentization/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', auth, getUsers); // Route protégée

module.exports = router;





