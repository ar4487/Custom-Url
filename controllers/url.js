const { nanoid } = require('nanoid')
const URL = require("../models/url")
const {getUser} = require('../services/auth')

async function handleGenerateNewShortUrl(req,res){
    try{
        const user = req.user; // Get user from request object (set by auth middleware)
        if (!user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        
        // Handle both JSON and form data
        const url = req.body.url || req.body.url;
        if(!url) return res.status(400).json({error:'Url is required'});

        const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        const expiresAt = new Date(Date.now() + expirationTime);
        const shortID = nanoid(8);
        
        await URL.create({
            shortId: shortID,
            redirectUrl: url,
            visitHistory:[],
            expires_at: expiresAt,
            createdBy: user._id
        });

        // If the request is AJAX (JSON), return JSON response
        if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
            return res.json({ id: shortID });
        }

        // For regular form submission, render the page
        const urls = await URL.find({ createdBy: user._id }).sort({ createdAt: -1 });
        return res.render("home", {
            id: shortID,
            user: user,
            urls: urls
        });
    }
    catch (error) {
        console.error(error);
        if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
            return res.status(500).json({ error: 'Error processing the request' });
        }
        return res.status(500).render("home", { 
            error: 'Error processing the request',
            user: req.user,
            urls: []
        });
    }
}
async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId; // use params if shortid is part of the URL path
        
   try{
    const result = await URL.findOne({ shortId });
    // Fetch the URL document from the database
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
   }
   catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing the request' });
}
}
async function handleRedirect(req, res) {
    const shortId = req.params.shortId; // Use params for the short ID in the URL path

    try {
        // Find the URL document by shortId
        const url = await URL.findOne({ shortId });

        if (!url) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Check if the URL has expired
        if (new Date() > new Date(url.expires_at)) {
            return res.status(410).json({ error: 'This URL has expired' });
        }

        // Log the visit (optional)
        url.visitHistory.push({ timestamps: Date.now() });
        await url.save();

        // Redirect to the original URL
        return res.redirect(url.redirectUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error processing the request' });
    }
}

async function handleDeleteUrl(req, res) {
    try {
        const shortId = req.params.shortId;
        const user = req.user;

        // Find the URL and check if it belongs to the user
        const url = await URL.findOne({ shortId, createdBy: user._id });
        
        if (!url) {
            return res.status(404).json({ error: 'URL not found or unauthorized' });
        }

        // Delete the URL
        await URL.deleteOne({ _id: url._id });

        // If it's an AJAX request, return JSON response
        if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
            return res.json({ message: 'URL deleted successfully' });
        }

        // For regular requests, redirect back to home
        return res.redirect('/');
    } catch (error) {
        console.error('Error deleting URL:', error);
        if (req.xhr || req.headers.accept.indexOf('application/json') > -1) {
            return res.status(500).json({ error: 'Error deleting URL' });
        }
        return res.status(500).redirect('/');
    }
}

module.exports={
    handleGenerateNewShortUrl,handleGetAnalytics,handleRedirect,handleDeleteUrl
}