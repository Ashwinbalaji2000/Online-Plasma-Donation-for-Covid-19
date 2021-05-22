const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  adharnumber: {
      type: String,
      required: true
  },
  phonenumber:{
      type: String,
      required: true
  },
  age:{
      type: String,
      required: true
    
  },
  gender:{
      type: String,
    required: true
    },
    Bloodgroup:{
        type: String,
        required: true
    },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
