const express = require('express');
const connectDB = require('./config/db');
const bodyparser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();
const cookieparser = require ('cookie-parser');


// connect db
connectDB();
//parse request to body-parser
app.use(express.urlencoded({
   extended:true,
})
);

// set View engin
app.set("view engine","ejs")

// load asserts
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use( express.static( "img" ) );

//Init Middleware
app.use(express.json({extended: false}));

app.use (cookieparser()); 
//Define routes
app.use('/api/registerp', require('./routes/api/registerp'));
app.use('/api/registerd', require('./routes/api/registerd'));
app.use('/api/getdata', require('./routes/api/getdata'));
app.use('/api/login', require('./routes/api/login'));
app.use('/api/controller', require('./routes/api/controller'));


const datarouter = require('./routes/api/controller');
const loginrouter = require('./routes/api/controller');
const router = require('./routes/api/registerp');
const routers = require('./routes/api/registerd');
const ploginrouter = require('./routes/api/login');

app.use('/gd', datarouter);

app.get('/',(req,res)=> {
res.render('index')
});
 
app.get('/rp',(req,res)=>
res.render("RP"));

app.post('http://localhost:5000/api/registerp',router)
app.post('http://localhost:5000/api/registerd',routers)
app.post('http://localhost:5000/api/login',ploginrouter)

app.get('/rd',(req,res)=>
res.render("RD"));

app.get('/plo',(req,res)=>
res.render('plo'));


app.get('/abd',(req,res)=>{
res.render('ABD');
}
);



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log( `server started on port ${PORT} `));