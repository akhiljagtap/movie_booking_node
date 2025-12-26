import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    cast: {
        type: [String],
        required:true,
    },
    crew: {
        type: [String],
        required:true,
    },
    formate: {
        type: [String],
        required:true,
    },
    director: {
        type: String,
        required:true,
    },
    language: {
        type: String,
        required: true,
        default:"English",
    },
    duration: {
        type: Number,
        required:true
    },
    releaseDate: {
        type: Date,
        required:true,  
    },
    genre: {
        type: [String],
        required:true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default:0,
    },
    posterUrl: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum:["released","comming_soon","stopped"]
    }
},{timestamps:true})


export default mongoose.model("Movie", movieSchema)
