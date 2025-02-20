import express from "express";
import { addProduct, deleteProduct, fetchProduct, fetchProducts, toggleAvailability, updateProduct } from "../controller/productFunctions.js";
const router = express.Router();

router.get("/", async (req, res) => {
  await fetchProducts(req, res);
});

router.get(`/:id`, async (req, res) => {
  await fetchProduct(req, res);
});

router.post("/", async (req, res) => {
  await addProduct(req, res);
});

router.put("/", async (req, res) => {
  const { action } = req.body;
  if (action === "update") {
    await updateProduct(req, res);
  } 
  else if (action === "availability") {
    await toggleAvailability(req, res);
  }
});

router.delete("/", async (req, res) => {
  await deleteProduct(req, res);
});

export default router;
