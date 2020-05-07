//Sample Mongoose Schema (Sensor class)  
var mongoose = require('mongoose'),  
    Schema = mongoose.Schema;  
  
var sensorSchema = new Schema({  
    nombre: String,  
    estado: String  
});  
  
//Export the schema  
module.exports = mongoose.model('Sensor', sensorSchema); 