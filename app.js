import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from './connectDB.js';
import usersRouter from './routes/usersRouter.js';
import membersRouter from './routes/membersRouter.js';
import adminRouter from './routes/adminsRouter.js';
import productsRouter from './routes/productsRouter.js';
import imagesRouter from './routes/imagesRouter.js';
import cartRouter from './routes/cartRouter.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000 ;
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Express Server is Running");
});

app.use("/users", usersRouter);
app.use("/admins", adminRouter);
app.use("/members", membersRouter);
app.use("/products", productsRouter);
app.use("/images", imagesRouter);
app.use('/productsImages', express.static('productsImages'));
app.use("/cart", cartRouter);



app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});