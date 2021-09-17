'use strict'
var Plato = require('../models/plato');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/plato');
var controller={
    getPlatos:function(req,res){
        Plato.find({}).sort().exec((err,platos)=>{
            if(err) return res.status(500).send({message:'Error en recuperar los datos'});
            if(!platos) return res.status(404).send({message:'No hay platos para mostrar'});
            return res.status(200).send({platos});
        })
    },

    
    savePlato:function(req,res){
        var plato= new Plato();
        var params = req.body;
        plato.nombre=params.nombre;
        plato.categoria=params.categoria;
        plato.descripcion=params.descripcion;
        plato.precio=params.precio;
        plato.imagen=null;

        plato.save((err,platoStores)=>{
            if(err) return res.status(500).send({message:'Error al guardar'});
            if(!platoStores) return res.status(404).send({message:'No se ha guardado el plato'});
            return res.status(200).send({plato:platoStores});
        });
    },
    getPlato:function(req,res){
        var platoId=req.params.id;
        if(platoId==null) return res.status(404).send({message:'El plato no existe'});
        Plato.findById(platoId,(err,plato)=>{
            if(err) return res.status(500).send({message:'Error en recuperar los datos'});
            if(!plato) return res.status(404).send({message:'El plato no existe'});
            return res.status(200).send({plato});
        });

    },
    updatePlato:function(req,res){
        var platoId=req.params.id;
        var update=req.body;
        Plato.findByIdAndUpdate(platoId,update,{new:true},(err,platoUpdate)=>{
            if(err) return res.status(500).send({message:'Error en actualizar los datos'});
            if(!platoUpdate) return res.status(404).send({message:'No existe el plato para actualizar'});
            return res.status(200).send({plato:platoUpdate});
        });

    },
    deletePlato:function(req,res){
        var platoId=req.params.id;
        Plato.findByIdAndRemove(platoId,(err,platoRemoved)=>{
            if(err) return res.status(500).send({message:'Error al eliminar los datos'});
            if(!platoRemoved) return res.status(404).send({message:'No se puede eliminar el plato'});
            return res.status(200).send({plato:platoRemoved});
        });

    },
    uploadImagenPlato:function(req,res){
        var platoId=req.params.id;
        var fileName="Image no subida";
        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif' || fileExt=='webp'){
                Plato.findByIdAndUpdate(platoId,{imagen:fileName},{new:true},(err,platoUpdated)=>{
                    if(err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!platoUpdated) return res.status(404).send({message:'El plato no existe y no se subio la imagen'});
                    return res.status(200).send({plato:platoUpdated});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension del archivo no es valida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImagenPlato:function(req,res){
        var file=req.params.imagen;
        var path_file='./images/'+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({message:'No existe la imagen'});
            }
        });
    },

}

module.exports=controller;