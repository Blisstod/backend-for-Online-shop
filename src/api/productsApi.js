const axios = require('axios');
const ApiError = require('../error/ApiError');
require('dotenv').config();

const productApiUrl = 'https://dummyjson.com';

class productApi {
    productBySearch = async (query) => {
        try {
            const response = await axios.get(`${productApiUrl}/products/search?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error.message);
            throw new ApiError('Error searching products', 500);
        }
    };

    getAllProducts = async () => {
        try {
            const response = await axios.get(`${productApiUrl}/products`);
            return response.data;
        } catch (error) {
            console.error('Error getting all products:', error.message);
            throw new ApiError('Error getting all products', 500);
        }
    };

    getProductsByCategory = async (category) => {
        try {
            const response = await axios.get(`${productApiUrl}/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error getting products by category:', error.message);
            throw new ApiError('Error getting products by category', 500);
        }
    };

    getProductById = async (id) => {
        try {
            const response = await axios.get(`${productApiUrl}/products/${id}`);
            return response.data
        } catch (error) {
            console.error('Error getting product by Id', error.message);
            throw new ApiError('Error getting product by Id', 500);
        }
    }
}

module.exports = new productApi();