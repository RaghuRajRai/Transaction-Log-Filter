//Requirements and settings
const bodyParser = require('body-parser');
const express = require('express');
var moment = require('moment');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/transactionRecords');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  id: Number,
  name: String,
  account: Number,
  time: { type: Date },
  amount: Number
});
var Transaction = mongoose.model('transactions', transactionSchema)

app.get('/', function (req, res) {
    res.render('index');
});



//Function to get stats of the database search
function stats(){


}

app.post('/auth', function (req, res) {
    email = req.body.email;
    password = req.body.password;
    
    if(email == 'root' && password == 'root')
    { 
        console.log("Autheticated.");
        Transaction.find({}, function(err, transaction) {
            if (err) throw err;
            obj = {print: transaction};
            res.render('dashboard', obj);
        
            //console.log(transaction);
          });
    }   
    else
    {
        console.log("Authentication failed.");
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
    searchterm = req.body.search;
    daterange = req.body.daterange;
    if( min!=0 || max!= 9999)
    {
    if (searchterm != '')
    {
      Transaction.find({ amount: { $gt: min, $lt: max }, "name" : { "$regex": searchterm, "$options": "i" } }).exec(function(err, transaction) {
        if (err) throw err;
        obj = {print: transaction};
        res.render('dashboard', obj);
      });
    }
    else{
      Transaction.find({ amount: { $gt: min, $lt: max }}).exec(function(err, transaction) {
        if (err) throw err;
        obj = {print: transaction};
        res.render('dashboard', obj);
      });
    }
    }
    else if (searchterm != '')
    {
      console.log(searchterm);
      Transaction.find({ "name" : { "$regex": searchterm, "$options": "i" } }).exec(function(err, transaction) {
        if (err) throw err;
        obj = {print: transaction};
        res.render('dashboard', obj);
      });
    }
    else if(daterange != "04/20/2019 - 04/20/2019"){
      start = daterange.slice(0,10);
      end = daterange.slice(11,21);
      console.log(moment(start).toString());
      Transaction.find({ "time": {"$gte": new Date(moment(start).toString()), "$lt": new Date(moment(end).toString())} }).exec(function(err, transaction) {
        if (err) throw err;
        obj = {print: transaction};
        res.render('dashboard', obj);
      });
    }
    else 
    {
      Transaction.find({}, function(err, transaction) {
        if (err) throw err;
        obj = {print: transaction};
        res.render('dashboard', obj);
    
        //console.log(transaction);
      });
    }

    //And this is the way transaction table would be updated.
    
    
    

});


//Listen to port
app.listen(3000, function () {
  console.log('Listening on port 3000.')
});