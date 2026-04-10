const express = require("express");
const router = express.Router();
const User = require("../models/User.Model")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
    const {email, name, password} = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ status: "N", message: "All fields are required"})
        }
        let existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({status: "N", message: "User exists already"})
        }
        let hashedPassword = await bycrypt.hash(password, 10)
        let newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        res.status(200).json({status: "Y", message: "User added successfully"})
    }
    catch(error) {
        return res.status(500).json({status: "N", error: "Internal server error: " + error})
    }

});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ status: "N", message: "All fields are required"})
        }
        let existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(400).json({status: "N", message: "Username or password is invalid."})
        }
        let isValidPassword = await bycrypt.compare(password, existingUser.password);
        if(!isValidPassword) {
            return res.status(400).json({status: "N", message: "Username or password is invalid."})
        }
        const token = jwt.sign(
            { 
                userId: existingUser._id, 
                email: existingUser.email, 
                name: existingUser.name
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        res.status(200)
        .json({
            status: "Y", 
            message: "User logged in successfully",
            token,
            user: {
                id: existingUser._id, 
                email: existingUser.email, 
                name: existingUser.name
            }
        })
    }
    catch(error) {
        return res.status(500).json({status: "N", error: "Internal server error: " + error})
    }

});



module.exports = router;