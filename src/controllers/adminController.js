const {User, DeletedUser} = require('../models/userModel')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')

class AdminController {
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find({})
            const deletedUsers = await DeletedUser.find({});
            res.json(users, deletedUsers)
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async addUser(req, res, next) {
        try {
            const { username, email, password, role } = req.body;
            let userExists = await User.findOne({ email });
            if (userExists) {
                return next(ApiError.conflict('User already exists with this email!'));
            }

            userExists = await User.findOne({ username });
            if (userExists) {
                return next(ApiError.conflict('User already exists with this username!'))
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });

            const user = await newUser.save();
            res.status(201).json({ message: 'User added successfully', user: user });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async editUser(req, res, next) {
        try {
            const { username, email, password, role } = req.body;
            const userId = req.params.id;

            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.unauthorized('User not found'))
            }

            const updatedData = { username, email, role };

            if (password) {
                updatedData.password = await bcrypt.hash(password, 5);
            }

            const updated = await User.findByIdAndUpdate(userId, updatedData, { new: true });

            res.status(200).json({ message: 'User edited successfully', user: updated });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;

            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.unauthorized('User not found'))
            }

            const deletedUser = new DeletedUser({ ...user.toObject(), deletedAt: new Date() });
            await deletedUser.save();

            await User.deleteOne({_id: userId});

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new AdminController();
