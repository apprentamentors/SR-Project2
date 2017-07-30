var exports = module.exports = {
  generateRandomSymbol:  function() {
    var symbols = "~!@#$%^&*()+?<>";
    var number = Math.floor(Math.random() * 15);

    return symbols[number];
  },
  generateRandomLetter: function() {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var number = Math.floor(Math.random() * 26);

    return letters[number];
  },
  generateRandomNumber: function() {
    return Math.floor(Math.random() * 10);
  },
  generateRandomHash: function() {
   var hash = "";

   for(var i = 0; i < 2; i++) {
     hash += this.generateRandomNumber();
     hash += this.generateRandomLetter();
     hash += this.generateRandomSymbol();
   }

   return hash;
 },
 generateShortenUrl: function() {
   var hash = this.generateRandomHash();
   var url = "https://tabby-chess.glitch.me/";
   var shortenUrl = url + hash;

   return shortenUrl;
 }
};
