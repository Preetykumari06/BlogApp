const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema(
    {
    name: {type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    role:{type:String,enum:['User','Moderator'],default:'User'},
},
{timeStamp:true}
);

// hashed the password
userSchema.pre('save',async function (next){
    const user=this;

    if(!userSchema.isModified('password')) return next();
    const salt=await bcrypt.genSalt();
    const hash=await bcrypt.hash(user.password, salt);
    user.password=hash;
    next();
})


// compare password
userSchema.methods.comparePassword = async function(candidatePassword){
    const user=this;
    return await bcrypt.compare(candidatePassword, user.password);
};


const User=mongoose.model('User',userSchema)


module.exports={
    User
}