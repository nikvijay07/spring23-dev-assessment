import express from 'express';
const router = express.Router();
import getTrainingLogs from '../../actions/getTrainingLogs.js';


router.get('/admin/training', async (req, res) => {


    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allTrainingLogs = await getTrainingLogs(lastId, limit)
        return res.status(200).send(allTrainingLogs)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all training logs"})
    }
})

export default router