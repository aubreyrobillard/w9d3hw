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
const AnimalModel = require('./models/animals'); //pulling the model that has our schema(empty setup)


//////////////////////
// Declare Middleware
// app.use is 
//////////////////////
app.use(morgan('dev')); //this middleware allows us to see the number code when refreshing page/errors/etc.
app.use(express.static('public')); //this middleware makes sure we can use the js and css file in our public folder so that the css we use on the page will show up
//static files are files that don't change when the application is running
app.use(express.urlencoded({extended: false}));
app.use(express.json()) //this middleware is added to see the json object in postman

// test the express app connection in browswer
app.get('/test', (req, res) => {
    res.send('ok');
  });

///////////////////////
// Declare Routes and Routers 
///////////////////////
// INDUCES - Index, New, Delete, Update, Create, Edit, Show


// READ //
//get full list of animals on main page//
app.get('/animals', async (req, res) => {
    const allAnimals = await AnimalModel.find({});
    res.render('index.ejs', { animals: allAnimals })
});


//get a single animal object from list using id# in url//
app.get('/animals/:id', async (req, res) => {
    const id = req.body._id;
    const animal = await AnimalModel.findById(req.params.id)
    // res.json(oneAnimal)
    
    res.render('show.ejs', { animal })
})


// CREATE //
//create and add a whole new animal/object to list//
app.get('/animals/new', (req, res) => {
    res.render('new.ejs')
})
app.post('/animals', async (req, res) => {
    if (req.body.extinct === "on" ? true : false)
    try {
        const addednimal = await AnimalModel.create(req.body);
    } catch{
        res.status(400).send('error')
    }
    res.redirect('/animals', {animal})
});

// UPDATE //
//edit an animal object in list
app.put('/animals/:id/edit', async (req, res) => {
    try {
        await AnimalModel.findByIdAndUpdate(req.params.id, req.body)
    } catch{
        res.status(400).send('error')
    }
});


// DELETE //
//delete an animal object from list
app.delete('/animals/:id', async (req, res) => {
    try {
        await AnimalModel.findByIdAndDelete(req.params.id)
        res.send('deleted')
    } catch{
        res.status(400).send('error')
    }
});


///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, (req, res) => {
    console.log(`LISTENING ON PORT ${PORT}`)
});