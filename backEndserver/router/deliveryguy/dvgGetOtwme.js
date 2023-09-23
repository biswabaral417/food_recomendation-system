const express = require('express')
const router = express.Router();
const otwOrders = require('../../model/orderONTheWaySchema')
// const orders = require('../../model/orderSchema')
// const UserData = require('../../model/userSchema')
require('../../db/conn')
const authenticate = require('../../middleware/authenticate');

router.get('/api/deliveryguy/getorders', authenticate, async (req, res) => {
    if (req.rootUser.isDeliveryGuy) {
        try {

            const pendingOrders = await otwOrders.find({ deliveredBy: req.rootUser._id })
                .populate('deliveredBy')
                .populate('Order')
                .populate({
                    path: 'Order',
                    populate: { path: 'user' }
                  })
                .populate({
                    path: 'Order',
                    populate: { path: 'items',populate:{path:'food'} }
                  })
            let dvgOrders = []
            pendingOrders.forEach(element => {
                let Ostate= element.Order.state
                // let orderUsrID = element.deliveredBy._id

                if (Ostate==="onRoute") {

                    dvgOrders.push(element)
                }
            })
            res.status(200).json(dvgOrders)

        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }
    else {
        res.status(403).json({ error: "unauthorized" })
    }
})
module.exports = router