const express = require('express')
const productsApi = require('../api/productsApi')
const ApiError = require('../error/ApiError')

class ProductController {
    async getAllProducts(req, res, next){
        try {
            const data = await productsApi.getAllProducts();
            return res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async productsBySearch(req, res, next) {
        try {
            const data = await productsApi.productBySearch(req.body);
            return res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getProductsByCategory(req, res, next) {
        try {
            const data = await productsApi.getProductsByCategory(req.body);
            return res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ProductController();