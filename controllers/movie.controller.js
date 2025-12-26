import movieModel from "../models/movie.model.js";

export const createMovie = async (req,res) => {
    try {
        const {
            name,
            description,
            cast,
            crew,
            formate,
            director,
            language,
            duration,
            releaseDate,
            genre,
            rating,
            posterUrl,
            status 
           
        } = req.body
        console.log(req.body);

        const movie = await movieModel.create({
            name,
            description,
            cast,
            crew,
            formate,
            director,
            language,
            duration,
            releaseDate,
            genre,
            rating,
            posterUrl,
            status 
        })
        res.status(201).json(movie)

    }
    catch (err) {
        res.status(500).json({
            message: "server error",
            error:err
        })
        
    }
}