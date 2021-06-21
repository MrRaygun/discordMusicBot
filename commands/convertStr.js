var cron = require("cron"); // package used to keep track of time
var amountUsed = 0; // keeps track of the number of times the method was used

function resetAmountUsed(){ // does what the name says
  amountUsed = 0;
}

const restart = new cron.CronJob("*/2 * * * *", resetAmountUsed); // used every 2 minutes
restart.start(); // starts the timer

module.exports = {
  name: 'convertStr',
  description: "Converts strings into 8 bit binary",
  execute(message, args){

    amountUsed++; // increments by 1
    if (amountUsed >= 5){ // if used more than 5 times, then wont translate
      message.reply("Im sorry but this command has hit its max usage of 5, please wait, for your usage to reset");
      return;
    }

    function stringToBinary(str, spaceSeparatedOctets) { // converts a message to binary
      function zeroPad(num) {
          return "00000000".slice(String(num).length) + num;
      }
  
      return str.replace(/[\s\S]/g, function(str) {
          str = zeroPad(str.charCodeAt().toString(2));
          return !1 == spaceSeparatedOctets ? str : str + " "
      });
    };

    // divides up the message so it can sent muliple time if need be
    if (message.content.length > 11)
    {
      let newMessage = message.content.slice(12);
      newMessage = stringToBinary(newMessage);
      
      for (i=0; i<newMessage.length; i+=1989)
      {
        message.channel.send(newMessage.slice(i,i+1989));
      }
    }
  }
}