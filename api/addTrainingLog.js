import express from 'express';
const router = express.Router();
import createTrainingLog from '../actions/createTrainingLog.js';

router.post('/training', async (req, res) => {

    const { date, description, hours, animal, user, trainingLogVideo } = req.body
    
    if (!date || !description || !hours || !animal || !user) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createTrainingLog({
            date: date,
            description: description,
            hours: hours,
            animal: animal,
            user: user,
            trainingLogVideo: trainingLogVideo || undefined
        });

        res.status(200).json({status: "Success", message: "Succesfully added Training Log!"});

    } catch (e) {
        console.log(e)
        if (e.message == "Animal does not belong to specified user") {
            return res.status(400).json({status: "Failed", message: e.message})
        }


        res.status(500).json({status: "Failed", message: "Failed adding Training Log"});
    }
})

export default router