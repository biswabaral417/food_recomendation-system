const express=require('express');
const router=express.Router();
require('../../db/conn');
const authenticate=require('../../middleware/authenticate')
const Order=require('../../model/orderSchema')




router.get('/api/dvg/getOrders', authenticate, async (req, res) => {
    if (req.rootUser.isDeliveryGuy === "true") {
        try {
            const ApproveOrders = await Order.find({state:"approved"})
                .populate({ path: 'user', select: ['userName', 'userEmail', 'userPhone', 'userLocation'] })
                .populate({path:'items.food',select:['itemName','itemPrice','state']});
            if (ApproveOrders) {
                res.status(200).json(ApproveOrders)
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
        return res.status(403).json({error:"unauthorized user"})
    }
})


module.exports=router