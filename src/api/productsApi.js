const axios = require('axios');
const ApiError = require('../error/ApiError');
require('dotenv').config();

const productApi = 'https://dummyjson.com';

const productBySearch = async (query) => {
    try {
        const response = await axios.get(`${productApi}/products/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error.message);
        throw new ApiError('Error searching products', 500);
    }
};

const getAllProducts = async () => {
    try {
        const response = await axios.get(`${productApi}/products`);
        return response.data;
    } catch (error) {
        console.error('Error getting all products:', error.message);
        throw new ApiError('Error getting all products', 500);
    }
};

const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${productApi}/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error getting products by category:', error.message);
        throw new ApiError('Error getting products by category', 500);
    }
};

module.exports = {
    productBySearch,
    getAllProducts,
    getProductsByCategory
};