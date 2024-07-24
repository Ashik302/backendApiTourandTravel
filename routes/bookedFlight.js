import express from "express";
import bookedFlight from "../models/bookedFlight.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const bookedFlights = req.body;

    try {
        let bookedConfirmed;
        if (Array.isArray(bookedFlights)) {
            bookedConfirmed = await bookedFlight.insertMany(bookedFlights);
        } else {
            bookedConfirmed = await bookedFlight.create(bookedFlights);
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
        const booked = await bookedFlight.findByIdAndUpdate(
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
router.get('/', async (req, res) => {
    try {
        const flight = await bookedFlight.find();
        res.status(200).json(flight)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

export default router;
