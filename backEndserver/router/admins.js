const express = require('express');
const router = express.Router()
require('../db/conn')
const UserData = require('../model/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const authSuperUser = require('../middleware/authSuperUser')
const logout = require('../middleware/logout')





router.use(express.json())


router.get('/api/users', authenticate, async (req, res) => {
    try {
        const users = await UserData.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/api/Admins', authenticate, async (req, res) => {

    try {
        if (req.rootUser.isSuperUser) {
            const Admins = await UserData.find({ isAdmin: { $ne: 'false' } });
            res.status(200).send(Admins);
        }
        else {
            res.status(400).json({ error: "unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

});

router.post('/api/admins/register', async (req, res) => {
    console.log("ksjbg")
    const { userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation } = req.body //es6 prop object destructuring ir userName=req.body.userName to {userNAme}=req.body

    if (!userName || !userPhone || !userEmail || !userPassword || !userConfirmPassword || !userLocation) {
        return res.status(422).json({ error: "enter all credintials" })
        console.log(req.body)
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
                const user = new UserData({ userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation, isAdmin: "pending" })

                const userRegistered = await user.save()
                if (userRegistered) {

                    res.status(201).json({ sucess: " registered" });
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


router.post('/api/admins/addtoadmins', authSuperUser, async (req, res) => {

    try {
        const filter = { _id: req.body._id };
        const update = { isAdmin: true };

        const result = await UserData.updateOne(filter, update);

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: 'User is now an admin' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})



const deleteAdminOrReq = async (user) => {
    try {
        const result = await UserData.findByIdAndDelete(user._id);

        if (!result) {
            return { error: 'User not found' };
        }

        return { success: 'User request deleted successfully' };
    } catch (error) {
        return { error: 'Server error' };
    }
};


router.post('/api/admins/deleteReq', authSuperUser, async (req, res) => {
    const response = await deleteAdminOrReq(req.body);

    if (response.error) {
        res.status(404).json(response);
    } else {
        res.status(200).json(response);
    }
});
router.post('/api/admins/removeAdmin', authSuperUser, async (req, res) => {
    const response = await deleteAdminOrReq(req.body);

    if (response.error) {
        res.status(404).json(response);
    } else {
        res.status(200).json(response);
    }
});



router.get('/api/admins/super/Issuperuser', authSuperUser, async (req, res) => {
    try {
        const isSuperUser = req.rootUser.isSuperUser;

        res.status(200).json({
            isSuperUser
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
})















module.exports = router;