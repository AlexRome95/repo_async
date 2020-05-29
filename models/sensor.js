//Sample Mongoose Schema (Sensor class)  
var mongoose = require('mongoose'),  
    Schema = mongoose.Schema;  
  
var sensorSchema = new Schema({  
    Temp: String,  
    NoCo: String,
    Fecha: Date 
});  
  
//Export the schema  
module.exports = mongoose.model('Sensor', sensorSchema); 