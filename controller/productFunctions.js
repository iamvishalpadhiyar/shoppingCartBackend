import Product from "../models/productDB.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export async function fetchProducts(req, res){
    try{
        const products = await Product.find();
        return res.json(products);
    }
    catch(error){
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function fetchProduct(req, res){
    try {
        const { id } = req.params;
        const product = await Product.findOne({ id });
        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        return res.json(product);
    }
    catch(error){
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function addProduct(req, res) {
    try {
        const { newProduct } = req.body;
        if (!newProduct) {
            return res.status(400).json({ message: 'Product details required' });
        }
        
        const { id, title, price, image, description, quentity, active, category, inCart, rating } = newProduct;        
        if ( !id, !title || !price || !image || !description || !quentity || active === undefined || !category || inCart === undefined || !rating || rating.rate === undefined || rating.count === undefined ) {
            return res.status(400).json({ message: 'All product fields are required' });
        }

        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
            return res.status(409).json({ message: 'Product already exists' });
        }
        const product = new Product(newProduct);
        product.image = `${process.env.pathURL}${path.basename(image)}`;
        await product.save();
        return res.status(201).json({ message: 'Product added successfully', product });
    
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function updateProduct(req, res) {
    try {
        const { updatedProduct } = req.body;
        if (!updatedProduct) {
            return res.status(400).json({ message: 'Product details required' });
        }
        
        const { id, title, price, image, description, quentity, active, category, inCart, rating } = updatedProduct;
        if (!id ||!title ||!price ||!image ||!description ||!quentity || active === undefined ||!category || inCart === undefined ||!rating || rating.rate === undefined || rating.count === undefined ) {
            return res.status(400).json({ message: 'All product fields are required' });
        }
        
        const product = await Product.findOneAndUpdate({ id }, updatedProduct);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.json({ message: 'Product updated successfully', product });
    }
    catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Product ID required' });
        }
        
        const product = await Product.findOneAndDelete({ id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function toggleAvailability(req, res){
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Product ID required' });
        }
        
        const product = await Product.findOne({ id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.active = !product.active;
        product.save();
        return res.json({ message: 'Product availability toggled successfully', product });
    }
    catch (error) {
        console.error('Error toggling product availability:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}