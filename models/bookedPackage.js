import mongoose, { Schema } from "mongoose";

const bookedPackageSchema = new Schema({
    packageName: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    numberOfGuest: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    trans_status: {
        type: String,
        required: true
    }
});

export default mongoose.model("bookedPackages", bookedPackageSchema);


// {showPayment && (
//     <>
//     <Payment total_amt={formData.finalPrice} name={"packages"} path={id} />
//     <p className="mt-4 text-red-100">We don't have other payment services available right now.</p>
//   </>
// )}