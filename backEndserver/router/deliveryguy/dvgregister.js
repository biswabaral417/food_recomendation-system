const express=require('express')
const router=express.Router()
require('../../db/conn')
const UserData=require('../../model/userSchema')


router.post('/api/dvg/register', async (req, res) => {
    console.log("req")
    const { userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation } = req.body //es6 prop object destructuring ir userName=req.body.userName to {userNAme}=req.body

    if (!userName || !userPhone || !userEmail || !userPassword || !userConfirmPassword || !userLocation) {
        return res.status(422).json({ error: "enter all credintials" })
        // console.log(req.body)
    }
    else {
        try {
            const userExists = await UserData.findOne({ userEmail: userEmail })
            if (userExists) {
                return res.status(422).json({ error: "user exists" })
            }
            else if (userConfirmPassword != userPassword) {
                return res.status(422).json({ error: "passwords donot match" }).send("error:passwords donot match")

            }
            else {
                const user = new UserData({ userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation, isDeliveryGuy: "true" })

                const userRegistered = await user.save()
                if (userRegistered) {

                    res.status(201).json({ success: " registered" });
                }
                else {
                    res.status(500).json({ failed: "server error" });
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

})


module.exports=router