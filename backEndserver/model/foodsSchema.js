const mongoose=require('mongoose')


const foodSchema=new mongoose.Schema({
    itemName: {
        type:String,
        require:true
    },
    itemPrice:{
        type:String,
        require:true 
    },
    itemImgLoc:{
        type:String,
        require:true 
    },
    rSeasons:{
        type:String,
        require:true 
    },
   

});
const foodItems=mongoose.model('foodItems',foodSchema);

module.exports=foodItems;