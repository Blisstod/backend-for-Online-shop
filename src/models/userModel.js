const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const deletedUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "USER"
    },
    deletedAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
const DeletedUser = mongoose.model('DeletedUser', deletedUserSchema);

module.exports = { User, DeletedUser };