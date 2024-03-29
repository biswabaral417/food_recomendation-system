const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'foodItems',
            required: true
        },
        count: {
            type: Number
        }
    
    
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true
    },
    items: [itemSchema] ,
    state: {
        type: String,
        enum: ['ordered', 'approved', 'onRoute'],
        default: 'ordered'
    },
    status:{
        type:String,
        enum:["redirected","pending","paid","failed"]
    },
    OrderedTime: {
        type: Date,
        default: Date.now() + 20700000
    },
    DeliveredTime: {
        type: Date,
        default: null
    },
    amount:{
        type:Number

    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 
