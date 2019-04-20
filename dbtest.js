//Requirements and settings
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql')

//Establishing connection parameters to the database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'transactionRecords'
})

//Connecting
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

   connection.query('CREATE TABLE transactions(id int primary key, account varchar(255), time timestamp, name text, amount int)', function(err, result) {
    if (err) throw err
    connection.query('INSERT INTO transactions (account, time, name, amount) VALUES (?, ?, ?, ?)', ['12345', '2008-11-11 13:23:44', 'Tom Hardy', 40000], function(err, result) {
      if (err) throw err
      connection.query('SELECT * FROM transactions', function(err, results) {
        if (err) throw err
        console.log(results[0].account)
        console.log(results[0].id)
        console.log(results[0].time)
        console.log(results[0].amount)

})
    })
})
});

//Query to keep polling the table for updates required
app.get("/",function(req,res){
    //push query to table
      connection.query('SELECT * FROM transactions', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('dashboard', obj);                
        }
    });

    });

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



    
    app.listen(3000);