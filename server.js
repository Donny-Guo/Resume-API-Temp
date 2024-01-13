const express = require('express'); /* import express */
const app = express(); /* create an express application */
const path = require("path"); /* install path library (built-in)*/
const { connectDB } = require("./database");
const apiRouter = require("./routes/api"); // import the api router

require("dotenv").config(); // read from .env

// call the connectDB function within the environment on server.jsj
// where we have the access to environement variables
// after "require("dotenv").config();"
connectDB.call(this);  

// allow our server to read json data from the request body from the client
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* test session */
app.use((req, res, next) => {
    console.log("This is my middleware1");
    next()
});
app.use((req, res, next) => {
    console.log("This is my second middleware.");
    next();
});
/* test session */


// Deliver the resource to home page
app.get("/", (req, res) => {
    console.log("__dirname = ", __dirname);
    // send the static file index.html to client
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", apiRouter); // route all the "/api" to apiRouter

// listening to the app
// app.listen(3000, () => {
//     console.log("App is listening on Port 3000")
// })
