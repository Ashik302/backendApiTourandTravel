import express from "express";
import bookedHotel from "../models/bookedHotel.js"; // Import the hotel booking schema

const router = express.Router();

// Create new hotel booking

router.post('/', async (req, res) => {
    const bookedHotels = req.body;

    try {
        let bookedConfirmed;
        if (Array.isArray(bookedHotels)) {
            bookedConfirmed = await bookedHotel.insertMany(bookedHotels);
        } else {
            bookedConfirmed = await bookedHotel.create(bookedHotels);
        }
        res.status(200).json(bookedConfirmed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        console.log(req.body.trans_status); // Log the transaction status to verify it's being sent correctly
        console.log("this is ", req.params.id)
        // Find the document by ID and update the transaction status
        const booked = await bookedHotel.findByIdAndUpdate(
            req.params.id,
            { trans_status: req.body.trans_status }, // Field to update
            { new: true } // Option to return the updated document
        );

        // Check if the document was found and updated
        if (!booked) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Respond with the updated document
        res.status(200).json(booked);
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(500).json({ message: "Error updating transaction status", error });
    }
});

// Test route to check if the router is working
router.get('/', async (req, res) => {
    try {
        const hotels = await bookedHotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
