const user = require("../models/user")
const {v4:uuidv4}= require('uuid')
const {setUser,getUser}= require('../services/auth')
const URL = require("../models/url")

async function handleUserSignup(req,res) {
    try {
        
        const{name,email,password}= req.body;
        await user.create({
            name,
            email,
            password
        })
        
        return res.redirect("/")
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error processing the request' });
    }
}

async function handleUserLogin(req,res) {
    try {
        const {email, password} = req.body;
        console.log('Login attempt for email:', email); // Debug log
        
        // Find user by email
        const User = await user.findOne({ email });
        console.log('User found:', User ? 'Yes' : 'No'); // Debug log
        
        if (!User) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check password
        if (User.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        // Generate token
        const token = setUser(User);
        console.log('Token generated:', token ? 'Yes' : 'No'); // Debug log
        
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        // Send success response
        return res.json({
            success: true,
            user: {
                _id: User._id,
                name: User.name,
                email: User.email
            }
        });
    } catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Error processing the request" });
    }
}

async function handleGetUserUrls(req, res) {
    try {
        const user = getUser(req);
        if (!user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const urls = await URL.find({ createdBy: user._id });
        return res.render("home", { urls });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching user's URLs" });
    }
}

async function handleUserLogout(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        return res.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Error processing the request" });
    }
}

module.exports ={
    handleUserSignup,
    handleUserLogin,
    handleGetUserUrls,
    handleUserLogout
}