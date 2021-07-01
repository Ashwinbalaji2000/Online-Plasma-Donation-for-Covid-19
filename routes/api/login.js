const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Patient= require('../../models/Patient');
const cookieparser = require ('cookie-parser');



//@route POST api/login
//@desc Authenticate patient and get token
//@acces public
router.post('',[
    check('adharnumber','please include a valid adhar number').isLength({min: 6}),
   check('password', 'password is required ').exists()
], 
async(req,res) => { 
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   } 
   const {adharnumber,password } = req.body;

  try{
      //see if the patient exist
      let patient = await Patient.findOne({adharnumber});

      if(!patient){
        return res
        .status(400)
        .json({errors:[ {msg: "Invalid credentials "}]});
      }
        

      const isMatch = await bcrypt.compare(password, patient.password);
      
      
      if(!isMatch) {
       return res
       .status(400)
       .json({errors:[ {msg: "Invalid credentials "}]}); 
           
      }

        //return jasonwebtoken
    const payload ={
        patient: {
            id: patient.id
        }
    } 
    jwt.sign(
        payload,
        config.get('jwtsecret'),
        {expiresIn:360000},
        (err,token) => {
            if (err) throw err;
           //res.json({ token });
        res.cookie('jwt', {token} );
      res.redirect('http://localhost:5000/gd')
      //  const tokens= req.cookies.jwt.token;
        //console.log(tokens);
         //next();
        
    }

        );
    
  }
  catch(err){
   console.error(err.message);
   res.status(500).send('server error');
  }
   
});


module.exports = router;