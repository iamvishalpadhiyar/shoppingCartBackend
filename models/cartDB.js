import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    id: { type: String, required: true},
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    image: { type: String, required: true},
    quentity: { type: String, required: true},
    active: { type: Boolean, required: true},
    userId: { type: String, required: true},
    count: { type: Number, required: true},
    rating: {
        rate: { type: Number, required: true},
        count: { type: Number, required: true}
    },
    _id: { type: String, required: true}
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;