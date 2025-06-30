const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hashed });
    await user.save();
    res.status(201).send("User registered");
  });

  
