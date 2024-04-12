const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router = express.Router();

router.use(authMiddleware)

router.get('/', productController.getAllProducts)
router.get('/search/:query', productController.productsBySearch)
router.get('/category/:category', productController.getProductsByCategory)
router.get('/:id', productController.getProductById)

module.exports = router;