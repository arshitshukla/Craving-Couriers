const express=require('express');
const router=express.Router();
const User=require("../models/User");
const {body , validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const jwtSecret="JaiShreeRadhaKrishna";

router.post('/createuser',[
    body('email','Please enter a valid email').isEmail(),
    body('name','Name must have atleast 3 characters').isLength({min:3}),
    body('password','Password must contain atleast 5 characters').isLength({min:5})
],async(req,res)=>{
    let success = false;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
        return res.status(400).json({success, error: "Sorry a user with this email already exists" });
        }
        const salt= await bcrypt.genSalt(10);
        const securePass= await bcrypt.hash(req.body.password,salt);
        user=await User.create({
            name:req.body.name,
            password:securePass,
            email:req.body.email,
            location:req.body.location
        })
        const data = {
            user: {
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, jwtSecret);
          success=true;

          res.json({success, authtoken })

    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post('/loginuser',[
    body('email','Please enter a valid email').isEmail(),
    body('password','Password must contain atleast 5 characters').isLength({min:5})
],async(req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { email, password } = req.body;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, userData.password);
        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data={
            user:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(data,jwtSecret);
        res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports=router;