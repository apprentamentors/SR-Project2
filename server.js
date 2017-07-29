var express = require("express");
var bodyParser = require("body-parser");
var dns = require("dns");

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/new", function(req, res){
  var url = req.body.url;

  validateHttp(url, res);
  validateSite(url, res);
  sendShortenUrl(url, res);

});
var validateHttp = function(url, res) {
    var isValid = /^(http|https):\/\/[^ "]+$/.test(url);

    if(isValid) {
      return;
    }
    else {
      res.json({
        "error": "invalid URL"
      });
    }
};

var validateSite = function(url, res) {
  var stripUrl = url.replace(/^(http|https):\/\/www\./, "");
  console.log(stripUrl);
  /*console.log(stripUrl);
  dns.lookup(stripUrl, function(err, address, family) {
    if(address == undefined) {
      res.json({
        "error": "invalid site"
      });
    }
    else {
        return true;
    }
  });*/
};
var sendShortenUrl = function(url, res) {
  var originalUrl = url;
  var shortenUrl = generateShortenUrl();

  res.json({
    "original_url": originalUrl,
    "shorten_url": shortenUrl
  });
};
var generateRandomNumber = function() {
  return Math.floor(Math.random() * 10);
};
var generateRandomLetter = function() {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var number = Math.floor(Math.random() * 26);

  return letters[number];
};
var generateRandomSymbol = function() {
  var symbols = "~!@#$%^&*()+?<>";
  var number = Math.floor(Math.random() * 15);

  return symbols[number];
};
var generateRandomHash = function() {
  var hash = "";

  for(var i = 0; i < 2; i++) {
    hash += generateRandomNumber();
    hash += generateRandomLetter();
    hash += generateRandomSymbol();
  }

  return hash;
};
var generateShortenUrl = function() {
   var hash = generateRandomHash();
   var url = "https://tabby-chess.glitch.me/";
   var shortenUrl = url + hash;

   return shortenUrl;
};
app.listen(port, function() {
  console.log("Node.js listening on http://localhost:" + port);
});
