import express from 'express';
const router = express.Router();
import createUser from '../actions/createUser.js';

router.post('/user', async (req, res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body
    console.log(firstName)
    console.log(password)
    
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePicture: profilePicture || undefined
        });
    
        res.status(200).json({status: "Success", message: "Succesfully added User!"});

    } catch (e) {
        console.log(e)
        res.status(500).json({status: "Failed", message: "Failed adding User"});
    }
})

export default router
