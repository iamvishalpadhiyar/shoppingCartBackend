import mongoose from "mongoose";

const userScheme = mongoose.Schema({
    userId: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true},
    status: {type: Boolean, required: true}
});

const User = mongoose.model("User", userScheme);
export default User;