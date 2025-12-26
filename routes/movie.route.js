import express from "express"
import { createMovies } from "../controllers/movie.controller.js"
import { fetchAllMovies } from "../controllers/movie.controller.js"
const movieRouter = express.Router()
movieRouter.post('/create', createMovies)
movieRouter.get('/fetch', fetchAllMovies)

export default movieRouter

