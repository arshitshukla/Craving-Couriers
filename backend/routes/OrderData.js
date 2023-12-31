const express=require('express');
const router=express.Router();
const Order=require('../models/Orders')

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});

    let eID= await Order.findOne({'email':req.body.email});
    if(eID===null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error1");        
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push: {order_data: data}}).then(()=>{
                    res.json({success:true})
            })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error2");
        }
    }
})

router.post('/myOrderData',async(req,res)=>{
    try {
        let orderData= await Order.findOne({'email':req.body.email});
        res.json({orderData:orderData});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error2");
    }
})

module.exports=router;