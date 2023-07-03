const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {User}=require('../models/userModel')


const jwtConfig=require('../config/jwt')



exports.login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user=await User.findOne({email})
    if(!user){
        return res.status(401).json({msg:'Invalid email or password'})
    }
    const passwordMatches=await bcrypt.compare(password, user.password)
    if(!passwordMatches){
        return res.status(401).json({msg:'Invalid email or password'})
    }
    const accessToken=jwt.sign({userId: user._id}, jwtConfig.secret,{
        expiresIn: jwtConfig.accessExpiresIn,
    })
    const refreshToken=jwt.sign({userId: user._id}, jwtConfig.secret,{
        expiresIn: jwtConfig.refreshExpiresIn,
    })
   
    res.json({accessToken, refreshToken})

    } catch(err){
   console.error(err)
   res.status(500).json9{msg:'Server error'}
    }
};












