const mongoose=require('mongoose');

const schema=mongoose.Schema;
const eventschema=new schema({
    eventName:String,
    eventType:String,
    eventLocation:String,
    description:String,
    startDate:Date,
    endDate:Date,
    // ticketFair:String,
    
});

module.exports=mongoose.model("event",eventschema,"events");