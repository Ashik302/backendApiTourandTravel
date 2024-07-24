import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import hotelsRoute from "./routes/hotels.js"
import flightsRoute from "./routes/flights.js"
import busesRoute from "./routes/buses.js"
import packagesRoute from "./routes/packages.js"
import cors from "cors"
import bookedFlights from "./routes/bookedFlight.js";
import bookedPackages from "./routes/bookedPackage.js";
import bookedBus from "./routes/bookedBus.js";
import bookedHotel from "./routes/bookedHotel.js";

const app = express();
app.use(cors());
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo)
        console.log("connect to the db")
    } catch (e) {
        console.log("error connecting database ", e)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("db disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("db connected")
})

//middlewares
app.use(express.json())
app.use("/hotels", hotelsRoute)
app.use("/flights", flightsRoute)
app.use("/packages", packagesRoute)
app.use("/buses", busesRoute)
app.use("/bookedFlights", bookedFlights)
app.use("/bookedPackages", bookedPackages)
app.use("/bookedBus", bookedBus)
app.use("/bookedHotel", bookedHotel)

app.listen(1010, () => {
    connect();
    console.log("server is running at port 1010")
})