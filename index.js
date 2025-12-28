
import express from "express"
import env from "dotenv"
import mongoose from "mongoose"
import movieRoute from "./routes/movie.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

const app = express()
env.config()
const PORT = process.env.PORT


//MIDDLEWARES

//bodyparser
app.use(express.json())  
app.use(express.urlencoded({ extended: true }))

//cookeiparser
app.use(cookieParser())


//ROUTER
app.use('/api/movie/v1', movieRoute)
app.use('/api/movie/v1', authRouter) 



app.get('/home', (req, res) => {
    console.log("hitting home page");
    
    return res.json({
        message: 'fetched successfully',
        success:true
    })
})

const startServer = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("db connected successfully");

        app.listen(PORT, () => {
            console.log(`APP IS LISTNING ON ${PORT}`);
            
        })        
        
    } catch (error) {
        console.log("db connection failed.", error);   
        process.exit(1)
    }
}

startServer()
