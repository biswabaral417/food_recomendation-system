const express=require("express")
const router=express.Router()
const order = require('../../model/orderSchema')
const CreateNewOrder=require("./orderManagement")
const createSignature=require("./createSignature")
const authenticate=require("../../middleware/authenticate")
const secretKeyEsewa = process.env.esewaKey;

router.post('/api/order', authenticate, async (req, res,next) => {
    try {
    const order=await CreateNewOrder(req,res)
    let message=`total_amount=${order.amount},transaction_uuid=${order._id.toString()},product_code=EPAYTEST`
    const signature=createSignature(message,secretKeyEsewa)


    const formData={
        "amount": order.amount,
        "failure_url": "http://localhost:9000/api/esewaPayment/failure",
        "product_delivery_charge": "0",
        "product_service_charge": "0",
        "product_code": "EPAYTEST",
        "signature": signature,
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "success_url": "http://localhost:9000/api/esewaPayment/success",
        "tax_amount": "0",
        "total_amount":order.amount,
        "transaction_uuid": order._id.toString()
    }    
        return res.status(200).json({message:"order created sucessfull", order , formData})   
    } catch (error) {
        return res.status(400).json({error:"no orders found"})
    }
});
module.exports=router
