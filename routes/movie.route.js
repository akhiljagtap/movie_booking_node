import express from "express"
import {fetchAllMovies, createMovies, fetchMovieByName } from "../controllers/movie.controller.js"
const movieRouter = express.Router()
movieRouter.post('/create', createMovies)
movieRouter.get('/fetch', fetchAllMovies)
movieRouter.get('/fetch/:name', fetchMovieByName)

export default movieRouter

