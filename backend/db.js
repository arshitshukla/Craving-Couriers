const mongoose = require('mongoose');
const MongoUrl='mongodb+srv://cravingcarriers:Jaishreekrishna@cluster0.eumcu18.mongodb.net/craving-couriers?retryWrites=true&w=majority';

const ConnectMongo=async()=>{
    try {
        await mongoose.connect(MongoUrl);
        console.log("Connected to MongoDB");
        const fooditems=mongoose.connection.db.collection("food_items");    
        let data=await fooditems.find({}).toArray();
        const foodcategory=mongoose.connection.db.collection("food_category");
        let category=await foodcategory.find({}).toArray();

        global.food_items=data;
        global.food_category=category;
        // console.log(data);   
    } catch (error) {
        console.log('error connecting to MongoDB',error);
    }
};

module.exports=ConnectMongo;
