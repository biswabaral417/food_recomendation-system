const mongoose = require('mongoose');

const orderONTheWaySchema= new mongoose.Schema({
    Order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    deliveredBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserData',
        required:true
    }
});

const otwOrders = mongoose.model('otwOrders', orderONTheWaySchema);

module.exports = otwOrders; 
