// server.js
// where your node app starts

// init project
var express = require('express');
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  const str = req.params.date_string;

  let date;
  if (str) {
    if (isNaN(str)) {
      date = new Date(str);
    }
    else {
      date = new Date(parseInt(str));
    }
  }
  else {
    date = new Date();
  }

  if (date instanceof Date && !isNaN(date)) {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  }
  else {
    res.json({"error": "Invalid Date"});
  }
});

app.get("/api/whoami", function(req, res) {
  const headers = req.headers;
  const ip = req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket && req.connection.socket.remoteAddress);
  const lang = headers["accept-language"];
  const agent = headers["user-agent"];
  res.json({
    "ipaddress": ip,
    "language": lang,
    "software": agent
  });
});

app.get("/api/shorturl/new", function(req, res) {

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});