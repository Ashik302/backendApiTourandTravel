import express from "express";
import Bus from "../models/buses.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const buses = req.body;

    if (Array.isArray(buses)) {
        // Handle array of bus objects
        try {
            const savedBuses = await Bus.insertMany(buses);
            res.status(200).json(savedBuses);
        } catch (error) {
            res.status(500).json({ message: "Error saving buses", error });
        }
    } else if (typeof buses === 'object') {
        // Handle single bus object
        try {
            const bus = new Bus(buses);
            const savedBus = await bus.save();
            res.status(200).json(savedBus);
        } catch (error) {
            res.status(500).json({ message: "Error saving bus", error });
        }
    } else {
        res.status(400).json({ message: "Request body should be an object or an array of bus objects" });
    }
});



router.get('/', async (req, res) => {
    try {
        const bus = await Bus.find()
        res.status(200).json(bus)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id)
        res.status(200).json(bus)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.patch('/updateAfterBooking/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id)
        const { availableSeats } = req.body;
        console.log("ma tw feri aaya hai")
        if (bus) {
            if (availableSeats) {
                bus.availableSeats = availableSeats;
                await bus.save();
                console.log("ma hya ne aaya")
                res.status(200).json(bus)
            }
            else {
                res.status(500).json({ error: "no available seats" })
            }
        }
    } catch (error) {
        console.log(error)
    }
})
export default router;