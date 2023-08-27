const mongoose = require('mongoose');






const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },
    items:  [{
    food:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foodItems',
            required: true
    },
    count:{
        type:Number
    }}],
    state:{
        type: String,
        enum: ['ordered', 'onRoute', 'paid'],
        default: 'ordered'
    },
    OrderedTime:{
        type:Date,
        default:Date.now()+20700000
    },
    DeliveredTime:{
        type:Date,
        default:null
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 
