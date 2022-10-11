const express = require("express")
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const postRoutes = require('./routes/post')
const userRoutes = require("./routes/user")

// Connexion sur MongoDB

mongoose.connect(process.env.DB_MONGOOSE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));





// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());                                                                       
app.use(cookieParser());

// Mise en place des routes et du chemin
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes,);
app.use('/images', express.static(path.join(__dirname, 'images')));

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});

// let static middleware do its job
app.use(express.static(__dirname + '/public'));

module.exports = app;