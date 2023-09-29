const express = require('express');
const router = express.Router();
const foods = require('../model/foodsSchema');
require('../db/conn');
const authenticate = require('../middleware/authenticate');



const isAdmin = (req, res, next) => {
    if (req.rootUser.isAdmin === "true") {

        next();
    } else {
        return res.status(404).json({ error: "unauthorized user" })
    }
}

router.post('/api/admins/modifySongdata', authenticate, isAdmin, async (req, res) => {

    const { item_name, imgloc, RecSeason, price } = req.body.adminInpFoods;
    console.log(item_name)

    try {
        if (item_name) {
            
            const existingItem = await foods.findOne({ itemName: item_name });

            if (existingItem) {
                

                if (imgloc !== 'undefined' && imgloc !== "" && imgloc === null) {
                    existingItem.itemImgLoc = imgloc;
                }


                if (RecSeason !== 'undefined' && RecSeason !== "" && RecSeason === null) {
                    existingItem.rSeasons = RecSeason;
                }


                if (price !== 'undefined' && price !== 0 && price === null) {
                    existingItem.itemPrice = price;
                }

                const eitemSaved = await existingItem.save();

                if (eitemSaved) {
                    
                    return res.status(200).json({ success: "Modified successfully" });
                } else {
                
                    return res.status(500).json({ failed: "Internal server error" });
                }
            }
            else {
                console.log("")

                if (item_name && price && imgloc && RecSeason) {

                    const food = new foods({ itemName: item_name, itemImgLoc:imgloc, rSeasons:RecSeason, itemPrice:price });

                    const foodSaved = await food.save();

                    if (foodSaved) {
                        return res.status(200).json({ success: "Food saved successfully" });
                    } else {
                        return res.status(500).json({ failed: "Internal server error" });
                    }
                }
                else {
                    
                    res.status(422).json({ error: "unprocessable request provided" })
                }
            }
        }
        else {
                    
            res.status(422).json({ error: "unprocessable request provided" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ failed: "Internal server error" });
    }
});

module.exports = router;
