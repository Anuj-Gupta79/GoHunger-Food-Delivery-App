import express from 'express';

const router =  express.Router();

router.get('/getData', (req, res) => {
    try {
        res.send([global.foodData, global.foodCategory]);
    } catch (error) {
        console.log(error.message);
        res.send("Server Error");
    }
})

export default router;