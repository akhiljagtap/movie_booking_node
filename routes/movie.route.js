import express from "express"

import { createMovie, updateMovie, deleteMovie, fetchAllMovies } from "../controllers/movie.controller.js"

import { verifyToken } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js"


const movieRouter = express.Router()

movieRouter.get('/', fetchAllMovies)

//PROTECTED ROUTES  
movieRouter.use(verifyToken, isAdmin)

movieRouter.post('/', createMovie)
movieRouter.patch('/:id', updateMovie)
movieRouter.delete('/:id', deleteMovie)


export default movieRouter

