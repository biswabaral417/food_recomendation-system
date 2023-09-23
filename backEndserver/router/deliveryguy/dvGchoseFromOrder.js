const express=require('express')
const router=express.Router()
require('../../db/conn')
const authenticate=require('../../middleware/authenticate')
const Order=require('../../model/orderSchema')
const otwOrders = require('../../model/orderONTheWaySchema')



router.post('/api/dvg/takeOrderRights', authenticate, async (req, res) => {
    if (req.rootUser.isDeliveryGuy === "true") {
        try {
            const OrDer = await Order.findOne(req.body)
            console.log(OrDer.state);
            const filter = { _id: req.body._id };
            const update = { state: "onRoute"  };
            
            const result = await Order.updateOne(filter, update);
            const Onroute=new otwOrders({Order:OrDer._id,deliveredBy:req.rootUser._id})
            const rights=await Onroute.save();
            if (result&&rights) {
                res.status(200).json({success:"rights transfered to u"})
            } else {
                res.status(500).json({error:"internal server error"})
            }
        } catch (error) {
            res.status(500).json({error:"unknown error"})
            console.log(error)
        }
    }
    else {
        return res.status(403).json({error:"unauthorized user"})
    }
})


module.exports=router