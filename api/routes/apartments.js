const express = require("express");
const router = express.Router();
const data = require("../db.json");

// Route handler for the root path ("/") to display all products
router.get("/", (req, res) => {
    res.status(200).json(data);
});


//Route to get products by ID
router.get("/:id", (req, res) => {
    const itemId = parseInt(req.params.id, 10); // Get the ID and convert to a number

    if (isNaN(itemId)) {
        // Check if itemId is a valid number
        return res
            .status(400)
            .json({ success: false, message: "Invalid ID format" });
    }
    const apartment = data.find((item) => item.id === itemId); // Find the product with the matching ID

    if (apartment) {
        res.status(200).json({ success: true, apartment });
    } else {
        res.status(404).json({ success: false, message: "apartment not found" });
    }
});


// Route to get products by type eg tier1, tier2, tier3
router.get("/type/:type", (req, res) => {
    const { type } = req.params;
    const apartmentByType = data.filter(
        (apartment) => apartment.type.toLowerCase() === type.toLowerCase()
    );
    res.json(apartmentByType);
});


// Route to get products by location
router.get("/location/:location", (req, res) => {
    const { location } = req.params;
    const apartmentByLocation = data.filter(
        (apartment) => apartment.location.toLowerCase() === location.toLowerCase()
    );
    res.json(apartmentByLocation);
});


//Route to get products by specific price
router.get("/price/:price", (req, res) => {
    const { price } = req.params; // Extract the price parameter from the URL
    const targetPrice = parseFloat(price); // Convert the price parameter to a number

    if (isNaN(targetPrice)) {
        // Check if targetPrice is a valid number
        return res
            .status(400)
            .json({ success: false, message: "Invalid price format" });
    }
    const parsePrice = (priceString) => {
        // Function to convert price strings to number
        return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    };

    const apartmentByPrice = data.filter(
        (apartment) => parsePrice(apartment.price) === targetPrice
    ); // Filter products with price

    if (apartmentByPrice.length === 0) {
        // If no products are found, return a 404 response
        return res
            .status(404)
            .json({
                success: false,
                message: `No apartment found at price: ${price}`,
            });
    }

    res.json({ success: true, apartment: apartmentByPrice }); // Respond with the filtered products
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Handling POST req to /apartment",
    });
});

module.exports = router;