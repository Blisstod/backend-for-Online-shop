const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', basketController.getBasketByUser);
router.post('/item', basketController.addItemToBasket);
router.delete('/item/:itemId', basketController.removeItemFromBasket);
router.patch('/item',  basketController.updateItemQuantity);
router.delete('/',  basketController.clearBasket);

module.exports = router;
