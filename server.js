var express = require("express");
var bodyParser = require("body-parser");
var urlShortener = require("./urlShortener.js");
var databaseInterface = require("./databaseInterface.js");

var app = express();

var port = process.env.PORT || 3002;

databaseInterface.connectDatabase();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/new", function(req, res){
  var url = req.body.url;

  urlShortener.validateHttp(url, res);
  urlShortener.validateSite(url, res);
});
app.get("/api/*", function(req, res) {
  var hash = req.params[0];
  var host_url = "http://localhost:3002/api/";
  shorten_url = host_url + hash;
  databaseInterface.redirectUrl(shorten_url, res);
});
app.listen(port, function() {
  console.log("Node.js listening on http://localhost:" + port);
});
