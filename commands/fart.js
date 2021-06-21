const path  = require("path");
var isOn = false; // keeps track of if the fart is on or not

module.exports = {
  name: "fart",
  description: "makes a fart sound",
  fart(message, args){ // makes the bot go Plorfffffp
    message.channel.send("PLorfffffp");
  }
}