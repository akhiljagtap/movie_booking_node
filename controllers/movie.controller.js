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

//FETCH BY genre
export const fetchMovieBygenre = async (req, res) => {
    try {
        const { genre } = req.params
        const normalization = genre.toLowerCase()

        const movies = await movieModel.find({ genre: normalization })
        if (movies.length == 0) {
            return res.status(404).json({
                message:"Movie not found for this genere."
            })
        }
        return res.status(201).json({
            message: "Movie fetched successfully for thus genre.",
            date:movies
        })
        
        
    } catch (error) {
        return res.status(500).json({
            message:"server error, MOvie not found for this genre."
        })
        
    }
    

}

//FETCH BY RATINGS
export const fetchMovieByRatings = async (req, res) => {
    try {
        const { rating } = req.params

        //req.params is always give the string, so explicit typecasting is needed for rating.
        const numericRating = Number(rating)

        if (Number.isNaN(numericRating)) {
            return res.status(404).json({
                message:"Rating must be a valid number."
            })
        }


        if (rating > 5 | rating < 1){
            return res.status(404).json({
                message:"ratings should be between 1 and 5 "
            })
        }

        const movie = await movieModel.find({ rating: numericRating })
        if (movie.length === 0) {
            return res.status(404).json({
                message:"No movie found for this ratings"
            })
        }
        return res.status(200).json({
            message: "movie fetched successfully for this ratings.",
            data:movie
        })
    
    
    } catch (error) {
        return res.status(500).json({
            message:"server error, Movie not found fot this ratngs."
        })
        
    }
}






