const jwt = require('jsonwebtoken')
const { User } = require('../models/userModel');
const ApiError = require('../error/ApiError')

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return next(ApiError.unauthorized('No authorization token provided!'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.user._id });

        if (!user) {
            return next(ApiError.notFound('User not found'))
        }

        if (user.role !== 'ADMIN') {
            return next(ApiError.forbidden('Access denied'))
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return next(ApiError.unauthorized('Authentication failed'))
    }
};

module.exports = adminAuth;
