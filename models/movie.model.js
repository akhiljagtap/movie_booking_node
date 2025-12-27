import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase:true,
    },
    description: {
        type: String,
        required: true,
         lowercase:true,
    },
    cast: {
        type: [String],
        required: true,
         lowercase:true,
    },
    crew: {
        type: [String],
        required: true,
         lowercase:true,
    },
    format: {
        type: [String],
        required: true,
         lowercase:true,
    },
    director: {
        type: String,
        required: true,
         lowercase:true,
    },
    language: {
        type: String,
        required: true,
        default: "English",
         lowercase:true,
    },
    duration: {
        type: Number,
        required: true,
      
    },
    releaseDate: {
        type: Date,
        required: true,  

    },
    genre: {
        type: [String],
        required: true,
         lowercase:true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0,
    },
    posterUrl: {
        type: String,
        required: true,
         lowercase:true,
        
    },
    status: {
        type: String,
        enum: ["released", "comming_soon", "stopped"],
        lowercase:true,
    }
},{timestamps:true})


export default mongoose.model("Movie", movieSchema)
