
import express from "express"
import env from "dotenv"
import mongoose from "mongoose"
const app = express()
env.config()

app.use(express.json())

const PORT = process.env.PORT


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
