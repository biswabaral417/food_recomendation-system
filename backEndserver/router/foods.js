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