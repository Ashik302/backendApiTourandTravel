import express from "express";
import flights from "../models/flights.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const flight = req.body;

    try {
        if (!Array.isArray(flight)) {
            const existingFlight = await flights.findOne({ flightNumber: flight.id });
            if (existingFlight) {
                // Update existing flight with new details
                const updatedFlight = await flights.findByIdAndUpdate(
                    existingFlight._id,
                    { $set: flight },
                    { new: true }
                );
                res.status(200).json(updatedFlight);
            } else {
                // Create a new flight if it doesn't exist
                const newFlight = new flights(flight);
                const saveFlight = await newFlight.save();
                res.status(200).json(saveFlight);
            }
        } else {
            const saveFlights = await flights.insertMany(flight);
            res.status(200).json(saveFlights);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const flight = await flights.find();
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flight = await flights.findById(req.params.id);
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch('/updateAfterBooking/:id', async (req, res) => {
    try {
        const flight = await flights.findById(req.params.id);
        const { className, tickets } = req.body;
        console.log(className)
        console.log(`Booking update request for flight ID ${req.params.id}`);
        console.log(`Class: ${className}, Tickets: ${tickets}`);

        if (!flight) {
            return res.status(404).json({ error: "Flight not found." });
        }

        if (!flight.availableSeats) {
            return res.status(400).json({ error: "Available seats information is missing." });
        }

        // Helper function to update seat counts
        const updateSeats = (classKey) => {
            if (!flight.availableSeats[classKey]) {
                return res.status(400).json({ error: `${classKey} seats information is missing.` });
            }
            flight.availableSeats[classKey].seats -= tickets;

            // Ensure seats do not go below zero
            if (flight.availableSeats[classKey].seats < 0) {
                return res.status(400).json({ error: `Not enough ${classKey} seats available.` });
            }
        };

        // Update seats based on class
        switch (className) {
            case 'FirstClass':
                updateSeats('FirstClass');
                break;
            case 'BusinessClass':
                updateSeats('BusinessClass');
                break;
            case 'EconomyClass':
                updateSeats('EconomyClass');
                break;
            default:
                return res.status(400).json({ error: "Invalid class name provided." });
        }

        await flight.save();
        console.log('Updated flight:', flight);
        res.status(200).json(flight);
    } catch (error) {
        console.error("Error while updating flight:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});


export default router;
