//code to remove food or items 
const express = require('express')
const router = express.Router()
const foods = require('../model/foodsSchema')
require('../db/conn')
const authenticate = require('../middleware/authenticate')

const isAdmin=(req,res,next)=>{
    if(req.rootUser.isAdmin==='true'){
        next()
    }
    else{
        return res.status(403).json({error:"wait a minute who are you?"})
    }
}

router.post('/api/admins/removeFooditem', authenticate,isAdmin, async (req, res) => {
    
    const {_id} = req.body
    if (_id) {
        try {
            // const RemoveItem = await foods.findOne({ _id:_id  })
            const RemoveItem= await foods.findOneAndDelete({ _id:_id  })//commented out for now so i can show only to sir when needed
            if (RemoveItem) {
                console.log(RemoveItem)
                return res.status(200).json({ success: "modified successfullly" })
            }
            else {
                return res.status(500).json({ error: "internal server error" })
            }

        } catch (error) {
            console.log(error)
        }
    }
    else {
        return res.status(422).json({ error: "invalidinputs" })
    }
}
)


module.exports = router