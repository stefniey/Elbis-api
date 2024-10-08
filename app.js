const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


// Importing routes
const apartmentRoutes = require("./api/routes/apartments");


// Middleware to parse JSON requests
app.use(bodyParser.json());


// Set up CORS to allow requests from specific origins
app.use(
    cors({
        origin: [
            "http://localhost:3000", 
            "http://localhost:5173", 
        ],
    })
);


// Routes that handle requests
app.use("/", apartmentRoutes);


// Handle unknown routes
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404; // Correct way to set the status code
    next(error); // Pass the error to the next middleware
});


// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;