import mongoose, { Schema } from "mongoose";

const packageSechma = new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    activities:{
        type: [String],
        required: true
    },
    accommodation:{
        hotel:{
            type:String,
            required: true
        },
        nights:{
            type:Number,
            required: true
        }
    }
})

export default mongoose.model('packages', packageSechma)