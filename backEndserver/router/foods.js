const express = require('express');
const router = express.Router()
require('../db/conn')
const foodItems = require('../model/foodsSchema')
const authenticate=require('../middleware/authenticate')





const getallfoods = async (res) => {

}


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


router.route('/api/cartdata')
    .post(authenticate, async (req, res) => {
        // Handle the POST request, process the data, and potentially update a database
        const requestData = req.body;
        // Process requestData and update data if necessary
        res.send('POST request received and processed');
    })
    .get( authenticate  ,async (req, res) => {
        // Handle the GET request, fetch data from a database, and send it as a response
        const fetchedData = await fetchDataFromDatabase(); // Replace with your data fetching logic
        res.json(fetchedData);
    });

module.exports = router;