const order = require('../../model/orderSchema')
const foodItems = require('../../model/foodsSchema')


const CreateNewOrder=async (req,res)=>{
    
    try {
        const dt = new Date() + 20700000
        const items = req.body;
        const user = req.rootUser;
        
        
        let foodarray = [];
        await Promise.all(items.map(async item => {
            const foodItem = await foodItems.findOne({ _id: item.fooditem._id });
            const count = item.count;
            foodarray.push({ food: foodItem, count: count })
        }));
        let totalAmt = 0;

        await Promise.all(items.map(async item => {
            const foodItem = await foodItems.findOne({ _id: item.fooditem._id });
            const count = item.count;
            price=foodItem.itemPrice.substring(0,2)
            totalAmt += Number(price) * count;
            
        }));
        const newOrder = new order({
            user: user,
            items: foodarray,
            status:"redirected",
            transaction_code:"",
            amount:totalAmt
        });

        
        const savedOrder = await newOrder.save();
        if (savedOrder) {
            return savedOrder
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the order.' });
    }
}
    module.exports=CreateNewOrder