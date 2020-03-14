const express=require('express');
const api=require('./routers/api');
const eventsapi=require('./routers/eventsapi');


const app=express();

var port=process.env.PORT || 5000;

app.use('/api',api);
app.use('/eventsapi',eventsapi);

http.listen(port, function() {
    console.log('listening on : '+port);
});
