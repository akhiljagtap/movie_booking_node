import express from "express"
import {
    fetchAllMovies,
    createMovies,
    fetchMovieByName,
    fetchMovieByStatus,
    fetchMovieBygenre,
    fetchMovieByRatings
} from "../controllers/movie.controller.js"


const movieRouter = express.Router()
movieRouter.post('/create', createMovies)
movieRouter.get('/fetch', fetchAllMovies)
movieRouter.get('/fetch/name/:name', fetchMovieByName)
movieRouter.get('/fetch/status/:status', fetchMovieByStatus)
movieRouter.get('/fetch/genre/:genre', fetchMovieBygenre)
movieRouter.get('/fetch/rating/:rating', fetchMovieByRatings)
export default movieRouter

