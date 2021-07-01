const jwt = require('jsonwebtoken');
const config = require('config');
const cookieparser = require('cookie-parser');
const patient = require('../models/Patient');

module.exports = function( req,res,next) {
      
   const token = req.cookies.jwt.token;
    console.log(token);
     next();
 
   //Get token from header
//    const {cookies} = req ;

       

 /*   // check if not token
    if(!token) {
        return res.status(401).json({msg:'no token , auth is denied!!!!!' });
    }

     // verify token
     try{
         const decoded = jwt.verify(token, config.get('jwtsecret'));

         req.patient = decoded.patient;
         next();

     }catch(err){
      res.status(401).json({msg: 'Token is not valid'});
     } */

    }
           
    

