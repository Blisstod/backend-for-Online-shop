const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less than 1.'],
                default: 1
            }
        }
    ],
}, { timestamps: true });

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
