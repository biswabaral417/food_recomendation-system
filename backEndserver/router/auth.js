const express = require('express');
const router = express.Router()
require('../db/conn')
const UserData = require('../model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const logout = require('../middleware/logout')





router.use(express.json())

router.post('/api/register', async (req, res) => {
    const { userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation } = req.body //es6 prop object destructuring ir userName=req.body.userName to {userNAme}=req.body
    if (!userName || !userPhone || !userEmail || !userPassword || !userConfirmPassword || !userLocation) {
        console.log(req.body)
        return res.status(422).json({ error: "enter all credintials" })
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
                const user = new UserData({ userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation })
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




router.post("/api/login", async (req, res) => {
    const { userEmail, userPassword } = req.body
    console.log(req.body);
    if (!userEmail || !userPassword) {
        return res.status(422).json({ error: "please enter email and passoword" })
    } else {

        try {
            const Verify = await UserData.findOne({ userEmail: userEmail })

            console.log(jwt.verify)
            if (Verify && await bcrypt.compare(userPassword, Verify.userPassword)) {
                const token = await Verify.generateAuthtoken();
                console.log(token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2630000000),
                    httpsOnly: true,
                    sameSite: "None",
                    secure: true
                })
                return res.status(201).json({ success: "successful login" })
            }
            else {
                res.status(422).json({ error: "given credentials are incorrect" })
            }

        } catch (error) {
            console.log(error);

        }
    }
})

//koni k gareko
router.get('/api/logs', authenticate, (req, res) => {
    if (req.rootUser.isAdmin==="true") {
        res.status(200).json({ userIs: "admin" });
    }else if ((req.rootUser.isDeliveryGuy==="true")) {
       res.status(200).json({ userIs: "dvg" });
   }else if ((req.rootUser.isAdmin==="false")&&req.rootUser) {
        res.status(200).json({ userIs: "customer" });
    }else {
        res.status(401).send("false");
    }
});



router.get('/api/logout', logout, (req, res) => {
    res.clearCookie('jwtoken', { path: '/', httpsOnly: true, sameSite: 'None', secure: true })
    res.status(200).json({ success: "logout success" })
});





module.exports = router;