import express from "express"
import { createMovie } from "../controllers/movie.controller.js"

const movieRouter = express.Router()
movieRouter.post('/create', createMovie)

export default movieRouter

