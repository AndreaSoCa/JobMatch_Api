/** This main route */

import express from 'express';

const router = express.Router();

router.get('/',(req, res)=>{
    res.send('Main route');
})

export default router;