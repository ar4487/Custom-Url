const { json } = require("express")
const jwt = require("jsonwebtoken")
const secret = "Arpit@123$$"

function setUser(user){
    const payload = {
        user
    }
    return jwt.sign(payload, secret)
}

function getUser(token) {
    try {
        if (!token) return null;
        const decoded = jwt.verify(token, secret);
        return decoded.user;
    } catch (error) {
        console.error("Token verification error:", error);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}