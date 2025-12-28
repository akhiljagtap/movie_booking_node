import express from "express"
import { createUser, getCurrentUser, loginUser, logoutUser } from "../controllers/auth.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

const authRoute = express.Router()

authRoute.post('/createuser', createUser)
authRoute.post('/loginuser', loginUser)
authRoute.post('/logoutuser', logoutUser)
authRoute.get('/me',  verifyToken, getCurrentUser)


export default authRoute
