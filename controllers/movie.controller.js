import movieModel from "../models/movie.model.js";
import { movieValidationSchema } from "../validators/movie.validators.js";


//CREATE MOVIE
export const createMovie = async (req, res) => {
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

//FETCH MOVIE
