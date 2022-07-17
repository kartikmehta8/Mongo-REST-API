"strict mode";
require("dotenv/config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000 || process.env.PORT;

/* Importing Routes for /posts Path. */
const postsRoute = require("./routes/posts");

/* Middleware */
app.use(bodyParser.json());
app.use(cors());

/* Printing the URL, Status Code and Method for every Request. */
app.use("/", (req, res, next) => {
    console.log(req.path + " " + res.statusCode + " " + req.method);
    next();
});

app.use("/posts", postsRoute);

/* Connecting to the MongoDB Database. */
mongoose.connect(process.env.DB_CONNECTION_URL, () => {
    console.log("Database: Connected");
});

app.get("/", (req, res) => {
    res.json({
        creator: "Kartik Mehta",
        website: "https://www.kartikmehta.engineer/",
        socials: {
            github: "https://github.com/kartikmehta8",
            linkedIn: "https://www.linkedin.com/in/kartikmehta17/",
            twitter: "https://twitter.com/kartik_mehta8",
        },
    });
});

app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
});
