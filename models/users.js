const mongoose=require('mongoose');


const schema=mongoose.Schema;
const userschema=new schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    phonenumber:String
});

module.exports=mongoose.model("user",userschema,"users");