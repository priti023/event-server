const expressdemo=require('express');
const api=require('./routers/api');

// const mongoose=require('mongoose');
//  console.log(mongoose);
// console.log(expressdemo);


const app=expressdemo();
app.listen(3000);
app.get("/",(req ,res)=>{
    res.send("hello express only slach");
});
app.get("/about",(req ,res)=>{
    res.send("inside About");
});
app.get("/profile",(req ,res)=>{
    res.send("inside profile");
});
app.get("/contactUs",(req ,res)=>{
    res.send("inside ContactUs");
});
app.get("/Amit",(req ,res)=>{
    res.send("hello Amit");
});

const courceList=[{id:1, name:"java" },
                  {id:2, name:"Angular"},
                  {id:3, name:"nodeJs"},
                  {id:4, name:"React"},];

// app.get("/getCourcess",(req,res)=>{
//     res.send(courceList);
// });
app.get("/getCource/id",(req,res)=>{
    // res.send(courceList);
    console.log(req.param);
});
