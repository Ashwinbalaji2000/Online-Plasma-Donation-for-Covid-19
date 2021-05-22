const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Donor = require('../../models/Doner');

//@route POST api/registerd
//@desc Register donor 
//@acces public

router.post('/', [
    check('firstname', 'FIRST Name Is Required').not().isEmpty(),
    check('lastname', 'LAST Name Is Required').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
     check('adharnumber', 'ADHAR NUMBER Is Required').not().isEmpty(),
    check('phonenumber', 'PHONE NUMBER Is Required').not().isEmpty(),
    check('age', 'AGE Is Required').not().isEmpty(),
    check('gender', 'GENDER Is Required').not().isEmpty(),
    check('Bloodgroup', 'BLOOD GROUP Is Required').not().isEmpty(),
    check('location', 'location  Is Required').not().isEmpty(),
    check('recoverydate', 'recovery date Is Required'),
    check('cn', 'COVID NEGATIVE Is Required').not().isEmpty() ,


      
], 

 async(req,res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    
    const { firstname,lastname,email,adharnumber,phonenumber,age,gender,Bloodgroup,location,recoverydate,cn} = req.body;
 
    try{
        //see if the user exist
        let donor = await Donor.findOne({email});
 
        if(donor){
          return res.status(400).json({errors:[ {msg: "donor already exist "}]});
        }
       donor = new Donor({
        firstname,
        lastname,
        email,
        adharnumber,
        phonenumber,
        age,
        gender,
        Bloodgroup,
        location,
        recoverydate,
        cn
       });
       
        await donor.save(); 
       res.send('DONOR REGISTERED SUCCESFULLY');
      
      res.redirect('/')     
    }                                       
    catch(err){
     console.error(err.message);
     res.status(500).send('server error');
    }




    });



module.exports = router;