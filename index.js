const express = require("express")
const route = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const app = express();
const port = 3000;
const path = require('path')
const URL = require('./models/url')
const{connecttoMongoDB}= require('./connect');
const userRoute = require("./routes/user")
const cookieParser= require("cookie-parser")
const {restrictToLoginUserOnly}= require("./middlewares/auth")
//const url = require("./models/url");

// Updated MongoDB connection with error handling
connecttoMongoDB("mongodb://localhost:27017/short-url")
    .then(() => {
        console.log("MongoDB Connected");
        // Start the server only after successful database connection
        app.listen(port, () => console.log(`Server started at port:${port}`));
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit the process if database connection fails
    });

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url",restrictToLoginUserOnly,route)
app.use('/',staticRouter)
app.use('/user',userRoute)

app.set('view engine', 'ejs'); 
app.set('views', path.resolve("./views"));

app.get('/test', async (req, res) => {
    try {
        // Ensure URL model is imported correctly
        const allUrl = await URL.find({}); 

        // Ensure 'home.ejs' exists inside the 'views/' folder
        return res.render("home", { urls: allUrl }); 
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).json({ error: 'Error processing the request' });
    }
});


app.get('/url/:shortid', async (req, res) => {
    const shortId = req.params.shortid;
    
    try {
        // Fetch the URL entry from the database
        const entry = await URL.findOne({ shortId });

        // Check if the entry exists
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Check if the URL has expired
        if (new Date() > new Date(entry.expires_at)) {
            return res.status(410).json({ error: 'This URL has expired' });
        }

        // If the URL is still valid, update the visitHistory with the current timestamp
        await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: { timestamps: Date.now() },
                },
            }
        );

        // Redirect to the original URL
        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error processing the request' });
    }
});
