const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.addUser);
router.put('/users/:id', adminController.editUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
