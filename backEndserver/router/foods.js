const express = require('express');
const router = express.Router()
require('../db/conn')
const foodItems = require('../model/foodsSchema')
const authenticate=require('../middleware/authenticate')



router.get('/api/foodsdata', async (req, res) => {
    try {
        const allfoods = await foodItems.find();
        if (allfoods) {
            res.status(200).send(allfoods)
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})


router.route('/api/cartdata').post( async (req, res) => {
        // const requestData = req.body;
        res.send('POST request received and processed');
    })
    // .get( authenticate  ,async (req, res) => {
    //     const fetchedData = await fetchDataFromDatabase(); 
    //     res.json(fetchedData);
    // });

module.exports = router;