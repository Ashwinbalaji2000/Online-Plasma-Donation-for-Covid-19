const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Patient = require('../../models/Patient');
const config = require('config');   
const jwt = require('jsonwebtoken');
//@route POST api/patientregister
//@desc Register patient 
//@acces public

router.post('', [
    check('firstname', 'FIRST Name Is Required').not().isEmpty(),
    check('lastname', 'LAST Name Is Required').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
    check('password', 'please enter the password min of 6 charecter').isLength({min: 6}),
    check('adharnumber', 'ADHAR NUMBER Is Required').not().isEmpty(),
    check('phonenumber', 'PHONE NUMBER Is Required').not().isEmpty(),
    check('age', 'AGE Is Required').not().isEmpty(),
    check('gender', 'GENDER Is Required'),
    check('Bloodgroup', 'BLOOD GROUP Is Required').not().isEmpty() 
  
], 

 async(req,res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    
   const { firstname,lastname,email,password,adharnumber,phonenumber,age,gender,Bloodgroup} = req.body;
 
    try{
        //see if the user exist
       let patient = await Patient.findOne({email});
 
        if(patient){
         return res.status(400).json({errors:[ {msg: "patient already exist "}]});
         }
       patient = new Patient({
        firstname,
        lastname,
        email,
        password,
        adharnumber,
        phonenumber,
        age,
        gender,
        Bloodgroup
       });
       
       const salt = await bcrypt.genSalt(10);
      
      patient.password = await bcrypt.hash(password,salt);
       await patient.save();
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
            res.json({ token });
           
        }
        );
        res.redirect('/RP')
           
    }                                       
    catch(err){
     console.error(err.message);
     res.status(500).send('server error');
    }




    });



module.exports = router;