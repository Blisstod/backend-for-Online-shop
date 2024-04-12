const bcrypt = require('bcrypt')
const { User } = require('../models/userModel')
const ApiError = require('../error/ApiError')

class UserController{
    async getUserProfile(req, res, next) {
        try {
            const user = await User.findById(req.user.id);
            if (!user){
                return next(ApiError.notFound('User not found'))
            }

            const { password, ...userInfo } = user.toObject();
            res.json(userInfo);
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateUserProfile(req, res, next){
        try {
            const { username, email } = req.body;
            const user = await User.findById(req.user.id);
            if (!user){
                return next(ApiError.notFound('User not found'))
            }

            user.username = username || user.username;
            user.email = email || user.email;

            if (req.body.password) {
                user.password = await bcrypt.hash(req.body.password, 5);
            }
            await user.save();
            res.json({ message: 'User updated successfully' });
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController();