// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment')

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/timestamp/:input", function (req, res) {
  let input_Date = req.params.input;
  if(isNumber(input_Date)){
    let obj = {
        unix : input_Date * 1,
        utc: moment.unix(input_Date/1000).format('ddd, DD MMM YYYY HH:mm:ss') + " GMT",
    }
    res.json(obj);
  } else {
       if(moment(input_Date,'YYYY-M-DD').isValid()){
            var date = moment(input_Date, 'YYYY-M-DD'); 
            var data = {
                unix: date.format('X')*1000,
                utc: date.format('ddd, DD MMM YYYY HH:mm:ss') + " GMT",
            }
            res.json(data);
        } else {
            var data = {
              error:"Invalid Date",
            }
            res.json(data);
        }
  }
});
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});