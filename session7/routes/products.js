const express = require("express");
const router = express.Router();



const Product = require("../models/products");


const products = [
    { id: 1, name: "Apple", price: 100 },
    { id: 2, name: "Banana", price: 200 },
    { id: 3, name: "Orange", price: 300 }
];

// Get all products
/* router.get("/", (req, res) => {
    res.json(products);
}); */

// Get all products from the database
router.get("/", async (req, res) => {
    const productsFromDB = await Product.find();
    res.json(productsFromDB);
});

// Get a single product by id
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send("Product not found");
    }
});

// Search products by name or id
router.get("/search", (req, res) => {
    const query = req.query.q;
    const id = req.query.id;
    let searchProducts = products;
    if (query) {
        searchProducts = searchProducts.filter(product => product.name.includes(query));
    }
    if (id) {
        searchProducts = searchProducts.filter(product => product.id == id);
    }
    res.json(searchProducts);
});

// Create a new product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.json(saved);
    } catch (error) {
        res.status(500).send("Error creating product");
    }
});

// Update a product by id
router.put("/:id", (req, res) => {
    const pid = req.params.id;
    const pname = req.body.name;
    const pprice = req.body.price;
    const index = products.findIndex(p => p.id == pid);
    if (index !== -1) {
        const updatedProduct = { id: Number(pid), name: pname, price: pprice };
        products[index] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).send("Product not found");
    }
});

// Delete a product by id
router.delete("/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        const deleted = products.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).send("Product not found");
    }
});

module.exports = router;