const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const basketRoutes = require('./basketRoutes');

const router = express.Router();

router.use(authMiddleware)

router.use('/basket', basketRoutes);

router.get('/profile', userController.getUserProfile);
router.patch('/profile', userController.updateUserProfile);

module.exports = router;
