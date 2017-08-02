var dns = require("dns");
var generateUrl = require("./generateUrl");
var databaseInterface = require("./databaseInterface");

var exports = module.exports = {
  validateHttp: function(url, res) {
      var isValid = /^(http|https):\/\/[^ "]+$/.test(url);

      if(isValid) {
        return;
      }
      else {
        res.json({
          "error": "invalid URL"
        });
      }
  },
  validateSite: function(url, res) {
    var stripUrl = url.replace(/^(http|https):\/\/www\./, "");

    dns.lookup(stripUrl, function(err, address, family) {
      if(err) {
        res.json({
          "error": "invalid site"
        });
      }
      else {
        return;
      }
    });
  },
  sendShortenUrl: function(url, res) {
    var originalUrl = url;
    databaseInterface.retrieveUrlData();

    /*res.json({
      "original_url": originalUrl,
      "shorten_url": shortenUrl
    });*/
  }
};

/* function createNewUrl(results, url) {

  console.log("createNewUrl");
  if(results == 0) {
    var shorten_url = generateUrl.generateShortenUrl();

    var hash = {
      original_url: url,
      shorten_url: shorten_url
    };
    db.collection("urls").save(hash);


    res.json(hash);
  }
  else {
    console.log("There are " + results + " duplicates");

  }
}
*/
