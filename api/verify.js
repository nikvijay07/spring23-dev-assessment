import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

router.post('/user/verify', async (req, res) => {
    
    const email = req.body.email
    const userExists = await User.findOne({'email': email})
    if (!userExists) {
        return res.status(403).json({status: "Failed", message: "Email is invalid"})
    }

    const inputPassword = req.body.password
    const loginValid = bcrypt.compareSync(inputPassword, userExists.password)

    const plainUserObject = userExists.toObject()
    if (loginValid) {
        const jwt_token = jwt.sign(plainUserObject, process.env.JWT_STRING, {expiresIn: "30s"})
        res.cookie("jwt-token", jwt_token, {
            httpOnly: true
        })
        return res.status(200).send("Login Successful!")
    } 
    return res.status(403).json({status: "Failed", message: "Email/Password combo is invalid"})
})


export default router
