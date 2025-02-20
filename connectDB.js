import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const dbName = "myShoppingCart";
const dbURL = `${process.env.db}${dbName}`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Database Connected");
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}

export { connectDB };