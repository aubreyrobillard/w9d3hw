// MAKING A C.R.U.D. APP WITH EXPRESS //
// CREATE, READ, UPDATE, DELETE


////////////////////////
// Setup - Import deps and create app object
////////////////////////
const express = require('express'); //pulling express from node_modules
require('dotenv').config(); //pulling the info from the .env file (PORT, mongo)
const app = express(); //setting up express app
const PORT = process.env.PORT; //defining the PORT variable to use in our app.listen
const morgan = require('morgan'); //pulling morgan from the node_modules
const AnimalRouter = require('./controllers/animalRoutes')

//////////////////////
// Declare Middleware
// app.use is basic for express. router.use is a smaller scope that we define
//////////////////////
app.use(express.urlencoded());
app.use(morgan('dev')); //this middleware allows us to see the number code when refreshing page/errors/etc.
app.use(express.static('public')); //this middleware makes sure we can use the js and css file in our public folder so that the css we use on the page will show up
//static files are files that don't change when the application is running
app.use(express.urlencoded({extended: false}));
app.use(express.json()) //this middleware is added to see the json object in postman


app.use('/animals', AnimalRouter); 

// // test the express app connection in browswer
// app.get('/test', (req, res) => {
//     res.send('ok');
//   });

///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, (req, res) => {
    console.log(`LISTENING ON PORT ${PORT}`)
});