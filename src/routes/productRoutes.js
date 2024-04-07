const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router = express.Router();

router.use(authMiddleware)

router.get('/', productController.getAllProducts)
router.post('/:query', productController.productsBySearch)
router.post('/category/:category', productController.getProductsByCategory)

module.exports = router;