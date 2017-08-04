var dns = require("dns");
var databaseInterface = require("./databaseInterface.js");

module.exports = function() {
  function validateHttp(url, res) {
    var isValid = /^(http|https):\/\/[^ "]+$/.test(url);
    if(isValid) {
      return;
    }
    else {
      res.json({
        "error": "invalid URL"
      });
    }
  }
  function validateSite(url, res) {
    var stripUrl = url.replace(/^(http|https):\/\/www\./, "");
    dns.lookup(stripUrl, function(err, address, family) {
      if(err) {
        res.json({
          "error": "invalid site"
        });
      }
      else {
      databaseInterface.checkDuplicateUrl(url, res);
      }
    });
  }
  return {
    validateHttp: validateHttp,
    validateSite: validateSite,

  }
}();
