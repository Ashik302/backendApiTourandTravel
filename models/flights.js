import mongoose, { Schema } from "mongoose";

const flightSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: {
        FirstClass: {
            seats: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        BusinessClass: {
            seats: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        EconomyClass: {
            seats: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    }
});


export default mongoose.model("flights", flightSchema)