const express = require("express")
const URL = require("../models/url")
const { getUser } = require("../services/auth")
const { restrictToLoginUserOnly } = require('../middlewares/auth')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if (!token) {
            return res.render('login');
        }

        const user = getUser(token);
        if (!user) {
            return res.render('login');
        }

        // Fetch user's URLs sorted by creation date (newest first)
        const urls = await URL.find({ createdBy: user._id }).sort({ createdAt: -1 });
        return res.render('home', { 
            urls, 
            user,
            id: null
        });
    } catch (error) {
        console.error('Error in home route:', error);
        return res.render('login');
    }
});

router.get('/signup', async(req, res) => {
    try {
        // Check if user is already logged in
        const token = req.cookies.token;
        if (token) {
            const user = getUser(token);
            if (user) {
                return res.redirect("/");
            }
        }
        return res.render('signup');
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "error while processing data"});
    }
});

router.get('/login', async(req, res) => {
    try {
        // Check if user is already logged in
        const token = req.cookies.token;
        if (token) {
            const user = getUser(token);
            if (user) {
                return res.redirect("/");
            }
        }
        return res.render('login');
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "error while processing data"});
    }
});

module.exports = router;