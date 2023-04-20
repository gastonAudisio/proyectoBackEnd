import mongoose from 'mongoose';

const cartCollection = 'carts';

const objectRequired = {
    type: Object,
    required: true
};


const cartSchema = new mongoose.Schema({
    products:objectRequired
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
