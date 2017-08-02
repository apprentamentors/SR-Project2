var express = require("express");
var bodyParser = require("body-parser");
var databaseInterface = require("./databaseInterface");
var urlShortener = require("./urlShortener");
var generateUrl = require("./generateUrl");

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

//  databaseInterface.checkDuplicateUrl(url, res);
});
app.listen(port, function() {
  console.log("Node.js listening on http://localhost:" + port);
});
