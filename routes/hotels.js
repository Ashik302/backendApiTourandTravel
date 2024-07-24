import express from "express";
import Hotel from "../models/hotels.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const hotels = req.body;

    // Check if the input is a single object or an array
    if (!Array.isArray(hotels)) {
        try {
            // Check if the hotel with the given ID already exists
            const existingHotel = await Hotel.findOne({ id: hotels.id });

            if (existingHotel) {
                // Update the existing hotel with new details
                const updatedHotel = await Hotel.findByIdAndUpdate(
                    existingHotel._id,
                    { $set: hotels },
                    { new: true }
                );
                return res.status(200).json(updatedHotel);
            } else {
                // Create a new hotel if it doesn't exist
                const newHotel = new Hotel(hotels);
                const savedHotel = await newHotel.save();
                return res.status(200).json(savedHotel);
            }
        } catch (error) {
            return res.status(500).json({ message: "Error processing the request", error });
        }
    } else {
        // Handle bulk insertion for an array of hotels
        try {
            const savedHotels = await Hotel.insertMany(hotels);
            return res.status(200).json(savedHotels);
        } catch (error) {
            return res.status(500).json({ message: "Error inserting hotels", error });
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.patch('/updateAfterBooking/:id', async (req, res) => {
    const { id } = req.params;
    let { roomType, numbers } = req.body;

    // Parse numbers to integer
    numbers = parseInt(numbers, 10);

    // Validate numbers
    if (isNaN(numbers) || numbers <= 0) {
        return res.status(400).json({ message: "Invalid number of rooms" });
    }

    try {
        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Ensure the room type exists in availableRooms
        if (!hotel.availableRooms[roomType]) {
            return res.status(400).json({ message: "Invalid room type" });
        }

        const roomTypeData = hotel.availableRooms[roomType];

        // Check if there are enough rooms available
        if (roomTypeData.rooms < numbers) {
            return res.status(400).json({ message: "Not enough rooms available" });
        }

        // Update the number of rooms
        roomTypeData.rooms -= numbers;

        // Save the updated hotel document
        await hotel.save();

        res.status(200).json({ message: "Hotel room availability updated successfully" });
    } catch (error) {
        console.error('Error updating hotel room availability:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router;
