
import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength:3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select:false,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default:"USER",
    },
    active: {
        type: Boolean,
        default:true,
        
    }
    
}, { timestamps: true })

export default mongoose.model("Auth", authSchema)