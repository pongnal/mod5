const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const userRouter = require("./routes/user");
app.use(express.json());


const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://ahmadzainalabqari:12345@cluster0.lpncxtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error("Connection error:", err));

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // continue to the route handler
  }
  
  app.use(logger);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use("/products", productsRouter);
app.use("/user", userRouter);
