import movieModel from "../models/movie.model.js";
import { movieFetchValidatorSchema } from "../validators/movie.fetch.validator.js";
import { movieValidationSchema } from "../validators/movie.validators.js";



//CREATE MOVIE
export const createMovies = async (req, res) => {
    const { error, value } = movieValidationSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message:error.details[0].message
        })
        
    }
    const movieName = value.name.toLowerCase()
    if (await movieModel.exists({ name: { $regex: `^${movieName}$`, $options: "i" } })) {
        return res.status(400).json({message:"Movie already exists." })
    }

    const movie =  await movieModel.create(value)
    return res.status(200).json({
        message: "movie created successfully. ",
        movieId: movie._id,
        movieName: movie.name
    })
    
}

//FETCH ALL MOVIES
export const fetchAllMovies = async (req, res) => {
    try {
        //fetching all movies
        const movies = await movieModel.find()
        return res.status(200).json({
            message: "movie fetched successfully.",
            total: movies.length,
            data:movies
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed to fetch movies!",
            error:error.message
        })
        
    }

}

// FETCH MOVIE BY NAME

export const fetchMovieByName = async (req, res) => {
    try {
    const { error, value } = movieFetchValidatorSchema.validate(req.params)
    if (error) {
        return res.status(500).json({
            message:error.details[0].message
        })
    }
    const name = value.name
    const movie = await movieModel.findOne({
        name: {
            $regex: `^${name}$`, $options: "i"
        }
    })
    if (!movie) {
        return res.status(404).json({
            message:"Movie not found"
        })
    }
    return res.status(200).json({
        message: "movie fetched successfully",
        data: movie
    })
        
    } catch (error) {
        return res.status(500).json({
            message: "failed to fetch movies",
            error:error.message
        })
        
    }
}

//FETCH BY STATUS
export const fetchMovieByStatus = async (req, res) => {
    try {
        const { status } = req.params
        console.log("status", status);
        
        const allowedStatus = ["released", "comming_soon", "stopped"]
        
        if (!allowedStatus.includes(status.toLowerCase())) {
            return res.status(400).json({
                message:"invalid status value."
            })
        }

        const movie = await movieModel.find({
            status: status.toLowerCase()
        })
        if (movie.length == 0) {
            return res.status(400).json({
                message:"No movie found for this status."
            })
        }

        if (!movie) {
            return res.status(404).json({
                message:"no movie found for this status."
            })
        }
        return res.status(200).json({
            message: "movie fetched by status successfully.",
            data : movie
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "failed to fetch the movie with this status.",
        })
        
    }
}







