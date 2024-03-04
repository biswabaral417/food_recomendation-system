const express = require("express");
const createSignature = require("./createSignature");
const Order = require("../../model/orderSchema");
const { default: mongoose } = require("mongoose");
const secretKeyEsewa=process.env.esewaKey
const router = express.Router();

router.get("/api/esewaPayment/success", async (req, res) => {
  try {
    const { data } = req.query;
    const decodedData = await JSON.parse(Buffer.from(data, "base64").toString("UTF-8"));
    let message;
    
    message = decodedData.signed_field_names.split(",").map((field) => `${field}=${decodedData[field] || ""}`).join(",");

    const signature = createSignature(message,secretKeyEsewa);
    if (signature !== decodedData.signature) {
      return res.status(400).json({ message: "error integrity error" });
    }
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;

    let order = await Order.findById(req.transaction_uuid); 
    order.transaction_code = req.transaction_code;
    order.status="paid"
    await order.save();
    res.redirect("http://localhost:3000/order");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error?.message || "no orders found" });
  }
});

module.exports = router;
