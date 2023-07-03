const {User} = require("../models/userModel");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.createUser = async (req,res) => {
   try{
     const {name,email,password}=req.body;
     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(password,salt);

     user = new User({
        name,
        email,
        password: hashedPassword,
     });
     await user.save();

    //  return jwt token
     const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: '1m',
     });
      return res.json({token});

   } catch(err){
       console.error(err.message)
       return res.status(500).send('Server Error');
   }
};


exports.getAllUsers = async (req,res) => {
    try{
        const users=await User.find().select('-password')
        return res.json(users)
    } catch(err){
        console.erro(err.message)
        return res.status(500).send('Server error')
    }
}


exports.getUserById = async (req,res) => {
    try{
        const user=await User.findById(req.params.id).select('-password')
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        return res.json(user);
    } catch(err){
   console.erro(err.message)
   if(err.kind === 'ObjectId'){
    return res.status(404).json({msg: 'User not found'})
    }
   return res.status(500).send('Server error')
    }
};

exports.updateUserById = async (req,res) => {
    try{
        const {name,email,password}=req.body;

        if(name) user.name=name;
        if(email) user.email=email;
        if(password){
            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(password, salt);
        }
        await user.save()

        return res.json(user);
    } catch(err){
        console.erro(err.message)
        if(err.kind === 'ObjectId'){
         return res.status(404).json({msg: 'User not found'})
         }
        return res.status(500).send('Server error')
         }
};

exports.deleteUserById = async (req,res) => {
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }
        await user.remove();

        return res.json({msg: "User deleted"})
    } catch(err){
        console.erro(err.message)
        if(err.kind === 'ObjectId'){
         return res.status(404).json({msg: 'User not found'})
         }
        return res.status(500).send('Server error')
         }
};
