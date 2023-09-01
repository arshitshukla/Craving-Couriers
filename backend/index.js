const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const ConnectMongo=require('./db');
var cors=require('cors');

ConnectMongo();

app.use(cors())
app.use(express.json());
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
app.get('/',(req,res)=>{    
    res.send('helloo')
})

app.listen(port,()=>{
    console.log("Hello");
})