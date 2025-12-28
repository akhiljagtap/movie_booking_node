import Jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyToken = (req,res,next) => {
    const token = req.cookies?.access_token
    if (!token) {
        return res.status(401).json({
            message: "YOU ARE UNAUTHORIZED."  
        })
    }

    Jwt.verify(token, process.env.JWT_SECRATE_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({
                message:"INVALID OR TOKEN IS EXPIRED."
            })
        }
        req.user = user

        // console.log("user = ", user);
        // console.log("req.user = ", req.user);
        
        next()
        
    })
}