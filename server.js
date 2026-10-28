// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Coffee = require('./models/coffee') // import the Coffee model






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()



















// Routes go here

app.get('/test', (req, res) => {
    res.render('testpage.ejs')
})

app.get('/', (req, res) => {
    res.render('homepage.ejs')
})
app.get('/coffees/new', (req, res) => {
    res.render('newCoffee.ejs')
})

app.post('/coffees',  async (req ,res)=>{
 req.body.isDecaf =  req.body.isDecaf === 'on'

 console.log(req.body)

 const createdCoffee = await Coffee.create({
 name: req.body.name , 
 description: req.body.description,
 image: req.body.image,
 price: req.body.price,
 country: req.body.country,
 isDecaf: req.body.isDecaf
 })

 res.redirect('/allCoffees') //redirect the user after coffee  created 

})

app.get('/allCoffees', async (req, res) => {
    const allCoffees = await Coffee.find({})
    res.render('allCoffees.ejs', { coffees: allCoffees })
})


app.get('/coffees/:id', async (req, res) => { // Get a coffee by ID
    const foundCoffee = await Coffee.findById(req.params.id)
  res.render('coffeeDetails.ejs', { coffee: foundCoffee })
})



app.delete('/coffees/:id/delete', async (req, res) => { // Delete a coffee by ID , post request is used for deletion
    const deletedCoffee = await Coffee.findByIdAndDelete(req.params.id)
    res.redirect('/allCoffees')
})



app.get('/coffees/:id/edit', async (req, res) => {
    const foundCoffee = await Coffee.findById(req.params.id)
    res.render('editCoffee.ejs', { coffee: foundCoffee })
})

app.put('/coffees/:id', async (req, res) => { //update a coffee by ID and redirect to its details page
    req.body.isDecaf = req.body.isDecaf === 'on'
    const updatedCoffee = await Coffee.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        country: req.body.country,
        isDecaf: req.body.isDecaf
    }, { new: true })
    res.redirect(`/allCoffees`)
})
 
 
 




app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000




