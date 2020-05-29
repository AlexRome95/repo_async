//App routes  
var asyncHandler = require('express-async-handler');
module.exports = function(app){  
    //Modelo del sensor
    var Sensor = require('../models/sensor');

    //Creacion de un nuevo sensor con Async
    sensor = ('/',asyncHandler(async(req,res,next)=>{
        var fecha = new Date();
        var sensor = new Sensor({Temp: req.body.Temp, NoCo: req.body.NoCo, Fecha: fecha.toISOString()});  
        sensor.save(function (err){
            if(err)
            return res.json({'R':'500 Error en servidor'});
        });
        res.json({'R':"200 ok"}); 
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

    lista = ('/',asyncHandler(async(req,res,next)=>{
        var Tipo = req.body.Tipo
        var FI = req.body.FI
        var FF = req.body.FF
        if(Tipo == "Completa"){
            Sensor.find({NoCo: req.body.NoCo},function(err,sensor){
                if(err)
                    return res.json({'R':"500 Error en servidor"})
                else
                    res.json({'R':200,'D':sensor})
            })
        }
        else if(Tipo == "Rango"){
            Sensor.find({NoCo: req.body.NoCo, Fecha:{
                $gte: new Date(FI),
                $lte: new Date(FF)
            }},function(err,sensor){
                if(err)
                    return res.json({'R':"500 Error en servidor"})
                else
                    res.send(sensor);
            })
        }else{
            return res.json({'R':'400 Error en datos o formato'})
        }
        

        /*
        Sensor.find(function(err,sensor){
            res.send(sensor);
        });
        */
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
        Sensor.findOneAndUpdate({_id: req.params.id},{Temp: req.body.Temp,NoCo: req.body.NoCo},function(err,sensor){
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
    app.post('/sensor/AgregaTemperatura', sensor);  
    app.get('/sensor', list);
    app.post('/sensor/ObtenerTemperatura', lista)
    app.get('/sensor/:id', find);
    app.put('/sensor/:id', Actualiza)
    
}