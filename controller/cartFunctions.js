import Cart from "../models/cartDB.js";

export async function fetchCart(req, res){
    try{
        const { id } = req.params;
        const cartProducts = await Cart.find({ userId : id });
        if(!cartProducts){
            return res.json([]);
        }
        return res.json(cartProducts);
    }
    catch(error){
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function addToCart(req, res){
    try {
        const { product, userId } = req.body;
        if(!product){
            return res.json({ message: "Product not sent" });
        }
        if(!userId){
            return res.json({ message: "User ID not sent" });
        }
        const { id, title, description, price, category, image, rating } = product;
        if(!id || !title || !description || !price || !category || !image || !rating){
            return res.json({ message: "Product Data Missing"});
        }
        const existingProduct = await Cart.findOne({ id: product.id, userId: userId });
        if(existingProduct){
            existingProduct.count++;
            await existingProduct.save();
            return res.json(existingProduct);
        }
        else {
            product.userId = userId;
            product.count = 1;
            product._id = `${product.id}${product.userId}`;
            const newProduct = new Cart(product);
            await newProduct.save();
            return res.json(newProduct);
        }
    }
    catch(error){
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function increaseProductCount(req, res){
    try {
        const { updatedProduct, userId } = req.body;
        if(!updatedProduct){
            return res.json({ message: "Product not sent" });
        }
        if(!userId){
            return res.json({ message: "User ID not sent" });
        }
        const product = await Cart.findOne({id: updatedProduct.id, userId: userId})
        if(product){
            product.count++;
            await product.save();
            return res.json(product);
        }
        else {
            return res.json({ message: "Product not found in cart" });
        }
    }
    catch(error){
        console.error("Error increasing product count:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function decreaseProductCount(req, res){
    try {
        const { updatedProduct, userId } = req.body;
        if(!updatedProduct){
            return res.json({ message: "Product not sent" });
        }
        if(!userId){
            return res.json({ message: "User ID not sent" });
        }
        
        const product = await Cart.findOne({id: updatedProduct.id, userId: userId})
        if(product){
            if(product.count === 1){
                await Cart.findOneAndDelete({id: updatedProduct.id, userId: userId});
                return res.json({ message: "Product removed from cart" });
            }
            else {
                product.count--;
                await product.save();
                return res.json(product);
            }
        }
        else {
            return res.json({ message: "Product not found in cart" });
        }
    }
    catch(error){
        console.error("Error increasing product count:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function removeProduct(req, res){
    try {
        const { removeProduct, userId } = req.body;
        if(!removeProduct){
            return res.json({ message: "Product not sent" });
        }
        if(!userId){
            return res.json({ message: "User ID not sent" });
        }
        
        await Cart.findOneAndDelete({id: removeProduct.id, userId: userId});
        return res.json({ message: "Product removed from cart" });
    }
    catch(error){
        console.error("Error removing product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}