const express = require('express');
const route = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require("../models/events");
const jwt = require('jsonwebtoken');



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

route.post("/event", verifyToken,(request, responce) => {
    console.log(" : : "+request.token);
    jwt.verify(request.token, 'secretkey',(err, authData) =>{
        if(err){
            responce.sendStatus(403);
        }else {
            console.log("hiii",request.body);
            if ((request.body.eventName == undefined || request.body.eventName == "")
                && (request.body.eventType == undefined || request.body.eventType == "")) {
                responce.json({ msg: "email and password both required",status:"error" })
            }
            else if (request.body.eventName == undefined || request.body.eventName == "") {
                responce.json({ msg: 'email required',status:"error" });
            } else if (request.body.eventType == undefined || request.body.eventType == "") {
                responce.json({ msg: "password is require" ,status:"error"});
            } else {
                Event.find({ eventName: request.body.eventName }, (error, data) => {
                    if (error) {
                        console.log(error);
                    } 
                    else {
                        let eventschema = request.body;
                        let event = new Event(eventschema);
        
                        event.save((err, data) => {
                            if (err) {
                                console.log("error occur while saving the data");
                                responce.json({ msg: 'error occur while saving the data',status:"error" });
                            } else {
                                console.log(data);
                                console.log("data saved successfully");
                                responce.json({ msg: 'Data saved successfully',status:"success",details:request.body});
                            }
                        });
                    }
                })
            }
        }
    })
    
   
});

route.get("/findAllEvents",(req,res)=>{
    Event.find((error,data)=>{
        if(error){
            res.json({msg:"error occur"});
        }else{
            res.send(data);
            console.log(data);
        }
    });
});


//FORMAT OF TOKEN
//Authorization: Bearer <access_token

//verify Token
function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token =bearerToken;
        console.log(bearerToken);
        //Next middleware
        next();
    }else {
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = route;