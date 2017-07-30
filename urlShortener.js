var dns = require("dns");
var generateUrl = require("./generateUrl");

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
  },
  sendShortenUrl: function(url, res) {
    var originalUrl = url;
    var shortenUrl = generateUrl.generateShortenUrl();

    res.json({
      "original_url": originalUrl,
      "shorten_url": shortenUrl
    });
  }
};
