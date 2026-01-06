import movieModel from "../models/movie.model.js";
import { movieValidationSchema } from "../validators/movie.validators.js";


// CREATE MOVIE
export const createMovie = async (req, res) => {
    const { error, value } = movieValidationSchema.validate(req.body)
    console.log("req body ", req.body);
    
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

// //EDIT MOVIE
export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params
    const updates = req.body

    const updateMovie = await movieModel.findByIdAndUpdate(
        id,
        { $set: updates },
        { new:true , runValidators:true}
    )
    if (!updateMovie) {
        return res.status(404).json({
            message:"Movie not found."
        })
    }

    return res.status(200).json({
        message: "Movie updated successfully",
        data:updateMovie
    })
    
   } catch (error) {
       console.error(error);
        res.status(500).json({
            message: "Server error", error: error.message
        })
   }
}

// //DELETE MOVIE
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        
        const deleteMovie = await movieModel.findByIdAndDelete(
            id
        )
        if (!deleteMovie) {
            return res.status(404).json({
                message:"Movie not found."
            })
        }
        return res.status(200).json({
            message: "Move deleted successfully",
            data:id
            
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error", error: error.message
        })
        
    }
}


//FETCH MOVIES WITh FILTER

export const fetchAllMovies = async (req, res) => {
    try {
     const { name, genre, status, rating, sort = "createdAt" } = req.query
    const filter = {}

    if (name) filter.name = new RegExp(name, "i")
    if (genre) filter.genre = genre.toLowerCase()
    if (status) filter.status = status.toLowerCase()
    if (rating) filter.rating = { $gte: Number(rating) }
    
    const movies = await movieModel.find(filter).sort(sort)

    return res.status(200).json({
        message: "applied respective filter",
        data:movies
    })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}







