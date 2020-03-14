const express = require('express');
const route = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("../models/users");





route.use(cors());
route.use(bodyParser.json());

const db = "mongodb+srv://amit:passamit@cluster0-0h4cx.mongodb.net/eventdb?retryWrites=true&w=majority";
mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log("error occur");
    } else {
        console.log("db connection successfully");
    }
});

route.get("/", (request, responce) => {
    responce.send("inside router");
});

route.post("/register", (request, responce) => {
    console.log("hiii",request.body);
    if ((request.body.email == undefined || request.body.email == "")
        && (request.body.password == undefined || request.body.password == "")) {
        responce.json({ msg: "email and password both required",status:"error" })
    }
    else if (request.body.email == undefined || request.body.email == "") {
        responce.json({ msg: 'email required',status:"error" });
    } else if (request.body.password == undefined || request.body.password == "") {
        responce.json({ msg: "password is require" ,status:"error"});
    } else {
        User.find({ email: request.body.email }, (error, data) => {
            if (error) {
                console.log(error);

            } else {
                console.log(data);
                if (data.length > 0) {
                    console.log("this email is exist");
                    responce.json({ msg: "this emailId already exist" ,status:"error"});
                }
                else {
                    console.log("emailid not exist");
                    let userschema = request.body;
                    let user = new User(userschema);

                    user.save((err, data) => {
                        if (err) {
                            console.log("error occur while saving the data");
                            responce.json({ msg: 'error occur while saving the data',status:"error" });
                        } else {
                            console.log("data saved successfully");
                            responce.json({ msg: 'Data saved successfully',status:"success",detail:{email:request.body.email} });
                        }
                    });
                }
            }
        })
    }
});
route.post("/login",(request,responce)=>{
    //  console.log(request.body);
    if((request.body.userName==undefined || request.body.userName=="" )
     && (request.body.password==undefined || request.body.password=="")){
        responce.json({msg:"emailId and password is required",status:"error"});
    }else if(request.body.userName==undefined || request.body.userName=="" ){
       responce.json({msg:"emailId is required",status:"error"});
    }else if( (request.body.password==undefined || request.body.password=="")){
       responce.json({msg:" password is required",status:"error"});
    }else{
        console.log("test dada : ",request.body);
        User.findOne({email:request.body.userName},(error,data)=>{
            console.log(error);
            console.log(data);
            if(error){
                responce.json({msg:"server error please try again",status:"error"});
            }
            else{
                console.log("data :  "+data);
                if(data){
                    if(request.body.password==data.password){
                        responce.json({msg:"login successfully",status:"success",details:data });
                    }else{
                        responce.json({msg:"Password does not match",status:"error"});
                    }
                }else{
                    responce.json({msg:"EmailId  is not registerd",status:"error"});
                } 
            }
        })
    }
});
route.post("/deleteByEmail",(req,res)=>{
    if(req.body.email==undefined || req.body.email==""){
        res.json({msg:"EmailId is required"});
    }else{
        User.findOne({email:req.body.email},(error,data)=>{
            if(error){
                res.json({msg:"error occur"});
            }else{
                if(data){
                    User.deleteOne({email:req.body.email},(error,data)=>{
                        if(error){
                            res.json({msg:"error while emailId is deleting"});
                        }else{
                            console.log(data);
                            res.json({msg:"data is deleted successfully"});
                        }
                    })
                }else{
                    res.json({msg:"thais EmailId is not Available in database"});
                }
            }
        })
    }
});
route.get("/findAllUser",(req,res)=>{
    User.find((error,data)=>{
        if(error){
            res.json({msg:"error occur"});
        }else{
            res.send(data);
        }
    });
});

      //******UPDATE******
route.post("/updateInfo",(req,res)=>{
    User.findOne({email:req.body.email},(error,data)=>{
        if(error){
            res.json({msg:"error occur while find emailId",status:"error"});
        }else{
            if(data){
                User.update({email:req.body.email},{$set:{password:req.body.newpassword}},(error,data)=>{
                    if(error){
                        res.json({msg:"error while update information",status:"error"});
                    }else{
                        res.json({msg:"Information is Successfully Updated",status:"success"});
                        console.log(req.body)
                    }
                    })
            }else{
                res.json({msg:"this emailId not Exist",status:"error"});
            }
        }
    })
})

module.exports = route;