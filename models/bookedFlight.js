import mongoose, {Schema} from "mongoose";

const bookedFlightSchema = new Schema({
    airline:{
        type: String,
        required: true
    },
    departAirport:{
        type: String,
        required: true
    },
    ariveAirport:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    numberOfTickets:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    trans_status:{
        type: String,
        required: true
    }
})

export default mongoose.model("bookedFlights",bookedFlightSchema);