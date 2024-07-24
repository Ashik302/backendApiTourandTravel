import mongoose, { Schema } from "mongoose";
import { stringify } from "uuid";

const hotelSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hotelImg: {
        type: String, // Assuming hotelImg refers to a single image URL
        required: true
    },
    hotelImages: {
        type: [String], // Assuming hotelImages refers to an array of image URLs
        required: false
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    availableRooms: {
        delux_AC_Bathroom: {
            rooms: {
                type: Number,
                required: true
            },
            maxPeople: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        AC_Rooms: {
            rooms: {
                type: Number,
                required: true
            },
            maxPeople: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        normal: {
            rooms: {
                type: Number,
                required: true
            },
            maxPeople: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        },
        familyRooms: {
            rooms: {
                type: Number,
                required: true
            },
            maxPeople: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    },
    bathrooms: {
        type: Number,
        required: true
    },
    swimmingPool: {
        type: Boolean,
        required: true
    },
    gym: {
        type: Boolean,
        required: true
    },
    spa: {
        type: Boolean,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    }
});


export default mongoose.model("hotels", hotelSchema);
