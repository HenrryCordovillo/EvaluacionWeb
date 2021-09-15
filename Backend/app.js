'use strict'
var express=require('express');
var bodyParser=require('body-parser');

var app=express();
var restaurante_routes=require('./routers/restauranteRoutes')
// todo lo que llega se combierta en json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST, OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST, OPTIONS,PUT,DELETE');

    next();
});

app.use('/',restaurante_routes);
module.exports=app;