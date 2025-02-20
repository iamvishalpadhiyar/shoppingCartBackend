import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true},
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    image: { type: String, required: true},
    quentity: { type: Number, required: true},
    active: { type: Boolean, required: true},
    inCart: { type: Boolean, required: true},
    rating: {
        rate: { type: Number, required: true},
        count: { type: Number, required: true}
    },
});

const Product = mongoose.model('Product', productSchema);
export default Product;