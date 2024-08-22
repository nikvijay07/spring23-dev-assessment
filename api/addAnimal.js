import express from 'express';
const router = express.Router();
import createAnimal from '../actions/createAnimal.js';


router.post('/animal',  async (req, res) => {
    const { name, hoursTrained, owner, dateOfBirth, profilePicture } = req.body
    
    if (!name || !hoursTrained || !owner) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createAnimal({
            name: name,
            hoursTrained: hoursTrained,
            owner: owner,
            dateOfBirth: dateOfBirth || undefined,
            profilePicture: profilePicture || undefined
        });

        res.status(200).json({status: "Success", message: "Succesfully added Animal!"});

    } catch (e) {
        console.log(e)
        res.status(500).json({status: "Failed", message: "Failed adding Animal"});
    }
})


export default router
