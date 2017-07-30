var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var urlShortener = require("./urlShortener");
var retrieveData = require("./retrieveData");

var app = express();

var port = process.env.PORT || 3000;

var db;
var databaseUrl = "mongodb://localhost:27017/urlShortener";
MongoClient.connect(databaseUrl, function(err, database) {
  console.log("Connected successfully to server");
  db = database;
  db
});

app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/new", function(req, res){
  var url = req.body.url;

  urlShortener.validateHttp(url, res);
  urlShortener.validateSite(url, res);

  db.collection("urls").find({}, { "original_url.http://www.google.com"}
)
  var hash = {
    originalUrl: url,
    shortenUrl: url + " ?"
  }
  db.collection("urls").insert(hash);

  urlShortener.sendShortenUrl(url, res);
});
app.listen(port, function() {
  console.log("Node.js listening on http://localhost:" + port);
});
