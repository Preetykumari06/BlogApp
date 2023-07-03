const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cors=require("cors")

require('dotenv').config()

const app=express()
app.use(express.json())




mongoose.connect(process.env.mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => {
    console.log("Connected to MongoDB Atlas.");
})
.catch(error => {
    console.error('Error connecting to MongoDB Atlas:',error.message);
})

app.use(cors())

app.use(bodyParser.json())

const blogRoutes = require('./controllers/blog');

app.use('/blogs', blogRoutes);

app.use((error,req,res,next) => {
    console.error(error.stack)
    res.status(500).send('Something went wrong');
})

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

