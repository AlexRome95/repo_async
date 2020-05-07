//App routes  
var asyncHandler = require('express-async-handler');
module.exports = function(app){  
    //Modelo del sensor
    var Sensor = require('../models/sensor');

    //Creacion de un nuevo sensor con Async
    sensor = ('/',asyncHandler(async(req,res,next)=>{
        var sensor = new Sensor({nombre: req.body.nombre, estado: req.body.estado});  
        sensor.save();  
        res.end(); 
    }));

    /*Creamos una nuevo sensor y lo guardamos
    sensor = function(req, res){  
        var sensor = new Sensor({nombre: req.body.nombre, estado: req.body.estado});  
        sensor.save();  
        res.end();  
    };  
    */
    //Buscar todas las lecturas de los sensores con Asincronicidad
    list = ('/',asyncHandler(async(req,res,next)=>{
        Sensor.find(function(err,sensor){
            res.send(sensor);
        });
    }));

    /*Buscar todas las lecturas de los sensores
        list = function(req,res){
            Sensor.find(function(err,sensor){
                res.send(sensor);
        });
    }
    */

    //ACTUALIZA POR ID con ASYNC
    Actualiza = ('/',asyncHandler(async(req,res,next)=>{
        Sensor.findOneAndUpdate({_id: req.params.id},{nombre: req.body.nombre,estado: req.body.estado},function(err,sensor){
            res.send(sensor);
        })
    }));

    /*Actualizar por ID
    Actualiza = (function(req,res){
        Sensor.findOneAndUpdate({_id: req.params.id},{nombre: req.body.nombre,estado: req.body.estado},function(err,sensor){
            res.send(sensor);
        })
    });
    */
    //BUSCA SENSOR POR SU ID ASYNC
    find = ('/',asyncHandler(async(req,res,next)=>{
        Sensor.findOne({_id: req.params.id},function(err,sensor){
            res.send(sensor);
        })
    }));

    /*Buscar sensor por su ID
    find = (function(req,res){
        Sensor.findOne({_id: req.params.id},function(err,sensor){
            res.send(sensor);
        })
    });
    */
 
    //Rutas y funciones 
    app.post('/sensor', sensor);  
    app.get('/sensor', list);
    app.get('/sensor/:id', find);
    app.put('/sensor/:id', Actualiza)
    
}