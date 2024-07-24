import mongoose, { Schema } from "mongoose";

const bookedHotelsSchema = new Schema({
   
    hotelName: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    numberofroom: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
    },
    trans_status: {
        type: String,
        required: true
    }
  
}); // Adding timestamps for createdAt and updatedAt fields

export default mongoose.model("bookedHotels", bookedHotelsSchema);
