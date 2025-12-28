import express from "express"
import { createUser, loginUser } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post('/createuser', createUser)
authRouter.post('/loginuser', loginUser)


export default authRouter
