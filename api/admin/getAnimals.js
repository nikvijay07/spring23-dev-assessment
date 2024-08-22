import express from 'express';
const router = express.Router();
import getAnimals from '../../actions/getAnimals.js';

router.get('/admin/animals', async (req, res) => {

    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allAnimals = await getAnimals(lastId, limit)
        return res.status(200).send(allAnimals)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all animals"})
    }
})


export default router