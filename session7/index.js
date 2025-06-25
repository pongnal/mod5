const express = require("express");
const app = express();

app.use(express.json());

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // continue to the route handler
  }
  
  app.use(logger);

const products = [
    {
        id: 1,
        name: "Product 1",
        price: 100
    },
    {
        id: 2,
        name: "Product 2",
        price: 200
    },
    {
        id: 3,
        name: "Product 3",
        price: 300
    }
]


app.get("/", (req, res) => {
    res.send("All good");
});

app.get("/test", (req, res) => {
    res.send("Test okay");
});

app.get("/products", (req, res) => {
    res.json(products);
});

// POST /products
app.post("/products", (req, res) => {
    const pid = req.body.id;
    const pname = req.body.name;
    const pprice = req.body.price;
    const newProduct = {
        id: pid,
        name: pname,
        price: pprice
    };
    products.push(newProduct);
    res.json(newProduct);
});

//Update /products/:id
app.put("/products/:id", (req, res) => {
    const pid = req.params.id;
    const pname = req.body.name;
    const pprice = req.body.price;
    const updatedProduct = {
        id: pid,
        name: pname,
        price: pprice
    };
    products[pid] = updatedProduct;
    res.json(updatedProduct);
});





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
