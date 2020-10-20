const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
// making contactDance database 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
// using module body parser 
const bodyparser = require("body-parser");


// DEFINE MONGOOSE SCEHMA 
const contactSchema = new mongoose.Schema({
    //  these are basically the value of name attribute of the parameters 
    //  mentioned in the contact form 
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
// Mongoose model 
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
// creating static folder with the name static
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
// when someone clicks on contact option in nav bar then contact page opens 
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
// making a post request on contact 
// when post request comes then we have to take all the post parameters 
//  and store them in a database 
// app.post('/contact', (req, res)=>{
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })
// adding more info to the upper app.post command 
// this is the reason we have set the method as post in contact.pug > contact form 

app.post('/contact', (req, res)=>{
    // when someone shoots/keeps post request on contact us 
    // then i will make new contact object with the help of req.body , 
    // extract content from the request and make a new contact object 
    var myData = new Contact(req.body);
// and myData.save() will save the data ,and while saving it will return a 
// promise , and we write .then to handle the promise , by the way all process 
// in node are asynchronous 
  myData.save().then(()=>{
    // writing response as "follows" 
    res.send("This item has been saved to the database")
    // if any error then we write .catch 
  }).catch(()=>{
    res.status(400).send("item was not saved to the database")
  });

//   this error was because we have already sent response 
// this res.status(200) was to create an alert which we can 
// do later on by creating alert from bootstrap 
//   we commented this because there was error due to it  
    // res.status(200).render('contact.pug');
})







// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});