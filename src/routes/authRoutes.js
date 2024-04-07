const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../controllers/authController')

router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({message: "Everything works fine!"})
})
router.post('/login', authController.login);
router.post('/registration', authController.register);
router.get('/auth', authMiddleware, authController.check)

module.exports = router;