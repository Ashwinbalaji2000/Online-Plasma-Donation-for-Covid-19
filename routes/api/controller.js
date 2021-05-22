const express = require('express');
const datarouter = express.Router(); 
const pregrouter = express.Router();
const loginrouter = express.Router();
const axios = require('axios');



datarouter.get('',async (req,res) =>{
    try {
        const donorsAPI = await axios.get(`http://localhost:5000/api/getdata`);
        res.render('gd',{ details : donorsAPI.data})      
    } catch (err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest){
            console.log(err.requiest)
        } else{
            console.error('ERROR', err.message)
        }
        
    }
})

module.exports = datarouter


const options = {
    headers: {'Content-Type': 'application/json'}
  };


/*pregrouter.get('',async (req,res) =>{
    try {
        
        const donorsAPI = await axios.post(`http://localhost:5000/api/registerp`{
            
        },headers);    
    } catch (err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest){
            console.log(err.requiest)
        } else{
            console.error('ERROR', err.message)
        }
        
    }
})

module.exports = pregrouter*/