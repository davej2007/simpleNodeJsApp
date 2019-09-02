const express = require ('express');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const config = require('./API/config/database');
const app = express(); 

// **** Port Variables
const PORT = process.env.PORT || 8080;
// const dbURI = process.env.dbUri || config.uri;

// **** API Routes
const APIRoute = require('./API/routes/api');

// **** Database Connection
// mongoose.connect(dbURI, {useNewUrlParser: true}, (err) => {
//     if (err){
//         console.log('DataBase Connection Error :', err);
//     } else {
//         console.log('Successfully Connected to Database : ',dbURI);
//     }
// });

// **** Middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// **** Router routes
app.use('/api', APIRoute);

// **** Main routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// **** Start Server
app.listen(PORT, () => {
    console.log('Server Running .... on port :'+PORT);
});
