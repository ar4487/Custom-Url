const { getUser } = require("../services/auth");

async function restrictToLoginUserOnly(req, res, next) {
    try {
        // Get token from cookie
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login");
        }

        const user = getUser(token);
        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictToLoginUserOnly:", error);
        return res.redirect("/login");
    }
}

module.exports = {
    restrictToLoginUserOnly
};
