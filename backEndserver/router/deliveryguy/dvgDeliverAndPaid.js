const express=require('express')
const router=express.Router()
require('../../db/conn')
const authenticate=require('../../middleware/authenticate')
const Order=require('../../model/orderSchema')
const otwOrders = require('../../model/orderONTheWaySchema')



router.post('/api/dvg/delivered', authenticate, async (req, res) => {
    if (req.rootUser.isDeliveryGuy === "true") {
        try {
            const OrDer = await Order.findOne(req.body)
            const filter = { _id: req.body._id };
            const update = { state: "paid"  };
            
            const result = await Order.updateOne(filter, update);
        
            if (result) {
                res.status(200).json({success:"updated on database"})
            } else {
                res.status(500).json({error:"internal server error"})
            }
        } catch (error) {
            res.status(500).json({error:error})
            console.log(error)
        }
    }
    else {
        return res.status(403).json({error:"unauthorized user"})
    }
})

module.exports=router