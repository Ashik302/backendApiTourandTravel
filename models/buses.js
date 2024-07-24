import mongoose, {Schema} from "mongoose";

const busesSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    route:{
        type: String,
        required: true
    },
    departureTime:{
        type:Date,
        required: true
    },
    arrivalTime:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    availableSeats:{
        type: Number,
        required: true
    }
})

export default mongoose.model('buses', busesSchema)