const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express(); 

//body - parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//DB Configuration
const db = require('./config/keys').mongoURI;

//Connection to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
.then(()=>{
    console.log('MongoDB Connected')
})
.catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

//Use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
