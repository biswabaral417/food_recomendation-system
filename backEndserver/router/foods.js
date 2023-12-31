const express = require('express');
const router = express.Router()
require('../db/conn')
const foodItems = require('../model/foodsSchema')
const authenticate = require('../middleware/authenticate')
const Order = require('../model/orderSchema')


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


router.post('/api/order', authenticate, async (req, res) => {
    try {
        const dt = new Date() + 20700000
        console.log(dt)
        const items = req.body;
        const user = req.rootUser;


        let foodarray = [];
        await Promise.all(items.map(async item => {
            const foodItem = await foodItems.findOne({ _id: item.fooditem._id });
            const count = item.count;
            foodarray.push({ food: foodItem, count: count })
        }));


        console.log(foodarray)
        const newOrder = new Order({
            user: user,
            items: foodarray
        });

        const savedOrder = await newOrder.save();
        if (savedOrder) {
            res.status(200).json({ success: "order placed" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the order.' });
    }
});




router.get('/api/admins/getOrders', authenticate, async (req, res) => {
    if (req.rootUser.isAdmin === "true") {
        try {
            const pendingOrders = await Order.find()
                .populate({ path: 'user', select: ['userName', 'userEmail', 'userPhone', 'userLocation'] })
                .populate({path:'items.food',select:['itemName','itemPrice','state']});
            if (pendingOrders) {
                res.status(200).json(pendingOrders)
            }
            else {
                res.status(200).send("no orders pending")
            }
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    else {
        return
    }
})

router.post('/api/admins/ApproveOrders', authenticate, async (req, res) => {
    if (req.rootUser.isAdmin === "true") {
        try {
            const OrDer = await Order.findOne(req.body)
            console.log(OrDer.state);
            const filter = { _id: req.body._id };
            const update = { state: "approved"  };
 
    
            const result = await Order.updateOne(filter, update);
            console.log(result)

        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    else {
        return
    }
})
















module.exports = router;    