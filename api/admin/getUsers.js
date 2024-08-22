import express from 'express';
const router = express.Router();
import getUsers from '../../actions/getUsers.js';

router.get('/admin/users', async (req, res) => {

    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allUsers = await getUsers(lastId, limit)
        return res.status(200).send(allUsers)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all users"})
    }
})


export default router