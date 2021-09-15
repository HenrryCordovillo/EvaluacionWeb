'use strict'
var express=require('express');
var RestauranteController=require('../controllers/controllersRestaurante');
var multipart=require('connect-multiparty');
var multiPartMiddleware=multipart({uploadDir:'./images'});


var router=express.Router();

router.get('/platos',RestauranteController.getPlatos);
router.post('/guardarPlato',RestauranteController.savePlato);
router.get('/plato/:id',RestauranteController.getPlato);
router.put('/plato/:id',RestauranteController.updatePlato);
router.delete('/plato/:id',RestauranteController.deletePlato);
router.post('/subir-imagen/:id',multiPartMiddleware,RestauranteController.uploadImagenPlato);
router.get('/get-imagen/:imagen',multiPartMiddleware,RestauranteController.getImagenPlato);



module.exports=router;