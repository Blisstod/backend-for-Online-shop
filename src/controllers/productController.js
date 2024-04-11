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
            const { query } = req.params;
            const data = await productsApi.productBySearch(query);
            return res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getProductsByCategory(req, res, next) {
        try {
            const { category } = req.params;
            const data = await productsApi.getProductsByCategory(category);
            return res.json(data);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getProductById(req, res, next) {
        try{
            const productId = req.params.id;
            const product = await productsApi.getProductById(productId);
            res.json(product)
        } catch (error) {
            next(ApiError).internal(error.message);
        }
    }
}

module.exports = new ProductController();