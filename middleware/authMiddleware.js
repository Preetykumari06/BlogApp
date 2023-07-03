const jwt=require('jsonwebtoken')
const {User}=require('../models/userModel')

const authMiddleware = async (req,res) = >{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({msg:'Authorization header not provided'})
        }
        const token=authHeader.split(' ')[1]
        const decodedToken=jwt.verify(token, process.env.JWT_SECRET)
        const userId=decodedToken.userId;

        const user= await User.findById(userId);
        if(!user){
            return res.status(401).json({msg: 'User not found'})
        }
        req.user=user;
        next()
    } catch(err){
    console.error(err)
     return res.status(401).json({msg: 'Invalid Token'})
    }
}


module.exports = {
    authMiddleware
};