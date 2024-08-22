
import express from 'express';
const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ "healthy": true });
});

export default router
