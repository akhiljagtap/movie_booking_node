import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken"
import dotenv from "dotenv"
import authModel from "../models/auth.model.js";
import { authValidationSchema, loginValidationScheme } from "../validators/auth.validator.js";

dotenv.config()

//CREATE USER
export const createUser = async (req, res) => {
    try {
        const { error, value } = authValidationSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message:error.details[0].message
            })
        }

        const { username, email, password } = value
        
        //check for existing user
        const existingUser = await authModel.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                message:"User with this email already exist."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //create only if not existing
        const user = await authModel.create({
            username,
            email,
            password: hashedPassword,
            role: "USER",
            active:true
        })

        const userObj = user.toObject()
        delete userObj.password


        return res.status(200).json({
            message: "user created successfully.",
            data: userObj,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"server error, user not created."
        })
    }
}

//LOGIN USER
export const loginUser = async (req, res) => {
    try {
        // console.log("headers ", req.headers);

        console.log("body ", req.body);
        const { error, value } = loginValidationScheme.validate(req.body)
    if (error) {
         return res.status(400).json({
             message: error.details[0].message
             
            })
    }

    const { email, password } = value

    const user = await authModel.findOne({ email }).select("+password")
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
            
        })
    }

    const isCorrectpassword = await bcrypt.compare(password, user.password)
    if (!isCorrectpassword) {
        return res.status(400).json({
            message: "invalid email or password"
            
        })
    }
        
        const token = Jwt.sign({
            userId: user._id,
            userRole: user.role
        },
            process.env.JWT_SECRATE_KEY,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        )

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
            
        })

    return res.status(200).json({
        message: " login successfull ",
        username: user.username,
        email: user.email,
        role: user.role,
    })
    
    } catch (error) {
        console.log("login error", error);
        
         return res.status(500).json({
             message: "server error, user not login.",
             error:error.message
        })
    
   }
}