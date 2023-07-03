const mongoose=require('mongoose')

const connect = async () => {
    try{
        const url=process.env.mongoURL;
        const options={
            useNewUrlParser: true,
           useUnifiedTopology:true,
           useCreateIndex:true,
           useFindAndModify:false,
        }
        await mongoose.connect(url, options)
        console.log('MongoDB connected successfully')
    } catch(err){
  console.log('MongoDB connection error:' err)
    }
}

module.exports={
    connect
}