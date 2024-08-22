import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.post('/user/login', async (req, res) => {
    
    const email = req.body.email
    const userExists = await User.findOne({'email': email})
    if (!userExists) {
        return res.status(403).json({status: "Failed", message: "Email is invalid"})
    }

    const inputPassword = req.body.password
    const loginValid = bcrypt.compareSync(inputPassword, userExists.password)

    if (loginValid) {
        return res.status(200).send("Login Successful!")
    } 
    return res.status(403).json({status: "Failed", message: "Email/Password combo is invalid"})
})

export default router