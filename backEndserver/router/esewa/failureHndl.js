const express=require("express")
const createSignature=require("./createSignature")


const router=express.Router()
router.get("/api/esewaPayment/failure",async(req,res,next)=>{
    try {
        const {data}=req.query
        const decodedData=JSON.parse(Buffer.from(data,"base64").toString("utf-8"))
        if(decodedData.status!=="COMPLETE"){
             message=decodedData.signed_feild_names
                .split(",")
                .map((felid)=>`${feild}=${decodedData[feild]||""}`)
                .join(",")
        }
        console.log(message.toString())
        const signature=createSignature(message,secretKeyEsewa)
        if(signature!==decodedData.signature){
            return res.status(400).json({message:"error integrety error"})
        }
        req.transaction_uuid=req.transaction_uuid
        req.transaction_code=req.transaction_code

        const order=await order.findByID(req.transaction_uuid)
        order.status=paid
        order.transaction_code=req.transaction_code
        await order.save()
        res.redirect("https://localhost:3000")
    } catch (error) {
        return res.status(400).json({error:error?.message||"no orders found"})

    }
})
module.exports=router