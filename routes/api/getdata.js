const express = require('express');
const router = express.Router(); 
const axios = require('axios');
const auth = require('../../middleware/auth');
 

const Donor = require('../../models/Doner');

//@route GET api/getdata
//@desc get all the donors data
//@acces private

router.get('', async (req,res) =>{
    try {
        const donors = await Donor.find().select('-age').select('-cn').select('-_id').select('-date');
        res.json(donors);
       } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router