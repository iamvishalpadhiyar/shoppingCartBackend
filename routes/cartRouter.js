import express from 'express';
import { addToCart, decreaseProductCount, fetchCart, increaseProductCount, removeProduct } from '../controller/cartFunctions.js';
const router = express.Router();

router.get("/:id", async (req, res) => {
    await fetchCart(req, res);
});

router.post("/", async (req, res) => {
    addToCart(req, res);
});

router.put("/", async (req, res) => {
    const { action } = req.body;
    if(action === "increase"){
        await increaseProductCount(req, res);
    }
    else if(action === "decrease"){
        await decreaseProductCount(req, res);
    }
});

router.delete("/", async (req, res) => {
    await removeProduct(req, res);
})

export default router;