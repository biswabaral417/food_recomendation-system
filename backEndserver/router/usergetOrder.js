const express = require('express')
const router = express.Router();
const Order = require('../model/orderSchema')
require('../db/conn')
const authenticate = require('../middleware/authenticate');
const { route } = require('./foods');

router.get('/api/user/getorders', authenticate, async (req, res) => {
    if (req.rootUser) {
        try {

            const pendingOrders = await Order.find()
                .populate({ path: 'user', select: ['_id', 'userName', 'userEmail', 'userPhone', 'userLocation'] })
                .populate({ path: 'items.food', select: ['itemName', 'itemPrice', 'state'] });
           
            let userOrders = []
            pendingOrders.forEach(element => {
                const userID = req.rootUser._id
                let orderUsrID = element.user._id
                
                if (userID.toString() == orderUsrID.toString()) {
                    
                    userOrders.push(element)
                }
            })
            res.status(200).json(userOrders)

        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    else {
        return
    }
})
module.exports = router