const jwt = require('jsonwebtoken')
const UserData = require('../model/userSchema')


const authSuperUser = async (req, res, next) => {
    
    try { 
        
        const token=req.cookies.jwtoken
        const verifyToken =  jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await UserData.findOne({ _id: verifyToken._id, "tokens.token": token });
        
        if (!rootUser) { throw new Error('user not found') }
        
        req.token = token;
        req.rootUser = rootUser; 
        req.userID = rootUser._id
        if (rootUser.isSuperUser) {
            next();
        }
        else{
            throw new Error("unAuthorized")
        }

    } catch (error) {
        res.status(401).send("unauthorized: token not provided")
    }


}
module.exports = authSuperUser;