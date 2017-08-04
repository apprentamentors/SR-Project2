var MongoClient = require("mongodb").MongoClient;
var urlShortener = require("./urlShortener.js");
var generateUrl = require("./generateUrl");
var db;

module.exports = function() {
  function connectDatabase() {
    var databaseUrl = "mongodb://localhost:27017/urlShortener";

    MongoClient.connect(databaseUrl, function(err, database) {
      console.log("Connected successfully to server");
      db  = database;
    });
  }

  function checkDuplicateUrl(original_url, res) {
    db.collection("urls").findOne({
      "original_url": original_url
    }, function(err, url) {
      if(url) {
        sendUrl(url.original_url, url.shorten_url, res);
      }
      else {
        var shorten_url = generateUrl.generateShortenUrl();
        saveUrl(original_url, shorten_url);
        sendUrl(original_url, shorten_url, res);
      }
    });
  }

  function saveUrl(original_url, shorten_url) {
    var scheme = {
      original_url: original_url,
      shorten_url: shorten_url
    };

    db.collection("urls").save(scheme);
  }
  function sendUrl(original_url, shorten_url, res) {
    var scheme = {
      original_url: original_url,
      shorten_url: shorten_url
    };

    res.json(scheme)
  }
  function redirectUrl(shorten_url, res) {
    console.log(shorten_url);
  db.collection("urls").findOne({
      "shorten_url": shorten_url
    }, function(err, url) {
      res.redirect(url.original_url);
    });

  }
  return {
    connectDatabase: connectDatabase,
    checkDuplicateUrl: checkDuplicateUrl,
    saveUrl: saveUrl,
    sendUrl: sendUrl,
    redirectUrl: redirectUrl
  }
}();
