const Basket = require('../models/basketModel');
const axios = require('axios');
const ApiError = require('../error/ApiError');
const productsApi = require('../api/productsApi')

class BasketController {
    async getBasketByUser(req, res, next) {
        try {
            const basket = await Basket.findOne({ user: req.user.id }).populate('items.product');

            const basketWithProductDetails = {
                ...basket.toObject(),
                items: await Promise.all(basket.items.map( async (item) => {
                    try {
                        const productDetails = await productsApi.getProductById(item.product);

                        return {
                            ...productDetails,
                            quantity: item.quantity
                        }
                    } catch (e) {
                        next(ApiError.internal(e.message))
                    }
                }))
            }

            res.json(basketWithProductDetails);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async addItemToBasket(req, res, next) {
        try {
            const { productId, quantity } = req.body;

            let basket = await Basket.findOne({ user: req.user.id });
            if (!basket) {
                basket = new Basket({ user: req.user.id, items: [{ product: productId, quantity: quantity }] });
            } else {
                const index = basket.items.findIndex(item => item.product.toString() === productId.toString());
                if (index > -1) {
                    basket.items[index].quantity += quantity;
                } else {
                    basket.items.push({ product: productId, quantity });
                }
            }
            await basket.save();
            res.status(201).json(basket);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async removeItemFromBasket(req, res, next) {
        try {
            const { itemId } = req.params;
            const basket = await Basket.findOne({ user: req.user.id });

            if (basket) {
                basket.items.pull(itemId);
                await basket.save();
            }
            res.status(200).json(basket);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async updateItemQuantity(req, res, next) {
        try {
            const { itemId, quantity } = req.body;
            const basket = await Basket.findOne({ user: req.user.id });

            if (basket && quantity > 0) {
                const item = basket.items.id(itemId);
                if (item) {
                    item.quantity = quantity;
                    await basket.save();
                    res.status(200).json(basket);
                } else {
                    res.status(404).send('Item not found');
                }
            } else {
                res.status(400).send('Invalid quantity');
            }
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async clearBasket(req, res, next) {
        try {
            await Basket.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } });
            res.status(204).send();
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController();
