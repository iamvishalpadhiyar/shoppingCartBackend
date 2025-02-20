import mongoose  from "mongoose";

const orderSchema = mongoose.model({
    orderId: { type: String, required: true, unique: true},
    customer: { 
        userid: { type: String, required: true},
        username : { type: String, required: true},
        paymentMethod: { type: String, required: true},
        email: { type: String, required: true}
    },
    order: [{
            id: { type: String, required: true, unique: true},
            title: { type: String, required: true },
            price: { type: Number, required: true },
            category: { type: String, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true},
            subTotal: { type: Number, required: true}   
        }
    ],
    totalAmount: { type: Number, required: true},
    approved: { type: Boolean, required: true}
});

const Order = mongoose.model('Order', orderSchema);
export default Order;