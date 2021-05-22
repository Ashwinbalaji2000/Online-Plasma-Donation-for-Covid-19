const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DonorSchema = new Schema({
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
    location:{
      type: String,
      required: true
    },
    recoverydate:{
        type: Date,
       
    },
    cn: {
        type:String,
        required: true
    },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Donor = mongoose.model('donor', DonorSchema);
