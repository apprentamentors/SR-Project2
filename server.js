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

app.post("/validateURL", function(req, res){
  var url = req.body.url;
  var valid = /^(http|https):\/\/[^ "]+$/.test(url);

  if(valid) {
    var stripUrl = url.replace(/^(http|https):\/\/www\./, "");
    dns.lookup(stripUrl, function(err, address, family) {
      console.log("address: %j family: %s", address, family);
    });
  }
  else {
    res.json({
      "error": "invalid URL"
    });
  }
});

app.listen(port, function() {
  console.log("Node.js listening on http://localhost:" + port);
});
