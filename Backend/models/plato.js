'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PlatoSchema=Schema({
    nombre:String,
    categoria:String,
    descripcion:String,
    precio:Number,
    imagen:String
});
module.exports=mongoose.model('plato',PlatoSchema);