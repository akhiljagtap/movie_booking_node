
import express from "express"
import env from "dotenv"
import mongoose from "mongoose"
import movieRoute from "./routes/movie.route.js"


const app = express()
env.config()
const PORT = process.env.PORT


//MIDDLEWARE
app.use(express.json())


//ROUTER
app.use('/api/movie/v1',movieRoute)




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
