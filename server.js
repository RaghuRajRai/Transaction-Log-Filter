//Requirements and settings
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transactionRecords'
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log('Database connection established.');
  });

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/auth', function (req, res) {
    email = req.body.email;
    password = req.body.password;
    
    if(email == 'root' && password == 'root')
    { 
        console.log("Autheticated.");
        connection.query('SELECT * FROM transactions', function(err, result) {

            if(err){
                throw err;
            } else {
                obj = {print: result};
                res.render('dashboard', obj);                
            }
        });
    }   
    else
    {
        console.log("Authentication failed.")
        res.render('retryindex');
    }
  });

app.post('/logout', function (req, res) {
    res.render('index');
});

//Handle empty values button press
app.post('/filter', function (req, res){
    //Filter queries would be loaded here and a row object would be retrieved.
    //This row object would then be passed to the html table.
    //Then we render the page again.
    min = req.body.minVal;
    max = req.body.maxVal;

    //And this is the way transaction table would be updated.
    connection.query('SELECT * FROM transactions WHERE amount>'+min+' AND amount<'+max, function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('dashboard', obj);                
        }
    });

});


//Listen to port
app.listen(3000, function () {
  console.log('Listening on port 3000.')
});