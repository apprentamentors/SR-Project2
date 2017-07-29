var App = function() {
  this.checkValidUrl = function() {
    console.log("Hello");
  }
  this.generateRandomNumber = function() {
    return Math.floor(Math.random() * 10);
  },
  this.generateRandomLetter = function() {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var number = Math.floor(Math.random() * 26);

    return letters[number];
  },
  this.generateRandomSymbol = function() {
    var symbols = "~!@#$%^&*()+?<>";
    var number = Math.floor(Math.random() * 15);

    return symbols[number];
  },
  this.generateRandomHash = function() {
    var hash = "";

    for(var i = 0; i < 2; i++) {
      hash += this.generateRandomNumber();
      hash += this.generateRandomLetter();
      hash += this.generateRandomSymbol();
    }

    return hash;
  }
}

var url = new App();
console.log(url.generateRandomHash());
