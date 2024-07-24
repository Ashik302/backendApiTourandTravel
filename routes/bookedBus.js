import express from "express";
import BookedBus from "../models/bookedBus.js";  // Adjust the path according to your file structure

const router = express.Router();

// Route to handle booking a bus
router.post('/', async (req, res) => {
    const bookedBus = req.body;

    try {
        let bookedConfirmed;
        if (Array.isArray(bookedBus)) {
            bookedConfirmed = await BookedBus.insertMany(bookedBus);
        } else {
            bookedConfirmed = await BookedBus.create(bookedBus);
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
        const booked = await BookedBus.findByIdAndUpdate(
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



// Route to handle getting all bookings (can be adjusted as needed)
router.get('/', async (req, res) => {
    try {
        const bookings = await BookedBus.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
