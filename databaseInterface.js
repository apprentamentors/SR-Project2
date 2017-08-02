var MongoClient = require("mongodb").MongoClient;
var generateUrl = require("./generateUrl");

var db;
var totalDuplicateUrl;
var exports = module.exports = {
  connectDatabase: function() {
    var databaseUrl = "mongodb://localhost:27017/urlShortener";

    MongoClient.connect(databaseUrl, function(err, database) {
      console.log("Connected successfully to server");
      db  = database;
    });
  },
  checkDuplicateUrl: function(url, res) {
  db.collection("urls").findOne({
      "original_url": url
    }, function(err, item) {
      if(item) {
        console.log("There is a duplicates");
        var scheme = {
          original_url: item.original_url,
          shorten_url: item.shorten_url
        };
        res.json(scheme);
      }
      else {
        console.log("There is no duplicates");
        var shorten_url = generateUrl.generateShortenUrl();
        var scheme = {
          original_url: url,
          shorten_url: shorten_url
        }

        db.collection("urls").save(scheme);
        res.json(scheme);
      }
    });
  },
  retrieveUrlData: function(url) {
    console.log("retrieveUrlData");
  },
  sendShortenUrl: function(url) {
    console.log("sendShortenUrl");
  }
};
