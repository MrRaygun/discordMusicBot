module.exports = {
  name: "tic_tac_toe",
  description: "plays a game of TicTacToe",
  execute(message, args){
    
    // never used
    let table = [["1","2","3"],
                ["4","5","6"],
                ["7","8","9"]
    ];

    const computer  = "O";
    const human = "X";
    let turn = "X";

    let reactions = {
      "1️⃣": 1,
      "2️⃣": 2,
      "3️⃣": 3,
      "4️⃣": 4,
      "5️⃣": 5,
      "6️⃣": 6,
      "7️⃣": 7,
      "8️⃣": 8,
      "9️⃣": 9
    }

    // prints aout the board in one line instead of 3 sepearate
    let boardString = "Player: X    Computer: O\n";
    boardString += reactions["1️⃣"] + " | " + reactions["2️⃣"] + " | " + reactions["3️⃣"] + "\n";
    boardString += reactions["4️⃣"] + " | " + reactions["5️⃣"] + " | " + reactions["6️⃣"] + "\n";
    boardString += reactions["7️⃣"] + " | " + reactions["8️⃣"] + " | " + reactions["9️⃣"] +"\n";

    function updateMessage(botMessage){
      let boardString = "Player: X    Computer: O \n";
      boardString += reactions["1️⃣"] + " | " + reactions["2️⃣"] + " | " + reactions["3️⃣"] + "\n";
      boardString += reactions["4️⃣"] + " | " + reactions["5️⃣"] + " | " + reactions["6️⃣"] + "\n";
      boardString += reactions["7️⃣"] + " | " + reactions["8️⃣"] + " | " + reactions["9️⃣"];

      if (checkWinner()){
        if (turn == "X"){
          boardString += "\nCongratulations @" + message.author.tag + "! You have won!";
        }
        else{
          boardString += "\nSorry @" + message.author.tag + ", but you lost; better luck next time.";
        }
      }
      botMessage.edit(boardString);
    }

    function checkWinner(){

      // check columns
      if (reactions["1️⃣"] == reactions["4️⃣"] && reactions["4️⃣"] == reactions["7️⃣"]
      || reactions["2️⃣"] == reactions["5️⃣"] && reactions["5️⃣"] == reactions["8️⃣"] 
      ||reactions["3️⃣"] == reactions["6️⃣"] && reactions["6️⃣"] == reactions["9️⃣"])
      {
        return true;
      }

      // check rows
      if (reactions["1️⃣"] == reactions["2️⃣"] && reactions["2️⃣"] == reactions["3️⃣"] 
      || reactions["4️⃣"] == reactions["5️⃣"] && reactions["5️⃣"] == reactions["6️⃣"] 
      || reactions["7️⃣"] == reactions["8️⃣"] && reactions["8️⃣"] == reactions["9️⃣"])
      {
        return true;
      }

      // check diagonals
      if (reactions["1️⃣"] == reactions["5️⃣"] && reactions["5️⃣"] == reactions["9️⃣"]
      || reactions["3️⃣"] == reactions["5️⃣"] && reactions["5️⃣"] == reactions["7️⃣"])
      {
        return true;
      }

      return false;
    }

    // doesnt work - make sure to reactivate the function on line 100
    function computerMove(message){
      var tempReactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

      var key = Math.floor(Math.random()*tempReactions.length);
      var attempts = 0;
      while (reactions[tempReactions[key]] == "X" || reactions[tempReactions[key]] == "O"){
        key = Math.floor(Math.random()*tempReactions.length);
      }
      reactions[tempReactions[key]] = turn;
      message.reactions.cache.get(reactions[tempReactions[key]]).remove().catch(error => console.error("Failed to removed"));
      turn ="X";
      updateMessage(message);
    }

    function playerMove(reaction, message){
      // only plays if the player has not picked that spot yet
      if (reactions[reaction.emoji.name] != "X" && reactions[reaction.emoji.name] != "O"){

        reactions[reaction.emoji.name] = turn;
        updateMessage(message);
        //turn = "O";
        if (turn == "O"){turn = "X";}
        else{turn = "O";}
        //computerMove(message);
      }
      
    }

    message.channel.send(boardString)
      // everything relating to the bots message
      .then(function (message){
        // adds the reactions
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
        message.react("5️⃣");
        message.react("6️⃣");
        message.react("7️⃣");
        message.react("8️⃣");
        message.react("9️⃣");

        // if the amount of reactions is above 1 returns true
        const filter = (reaction, user) => {
          return message.reactions.cache.get(reaction.emoji.name).count > 1;
        };

        /* activates a reaction collector 
          allows the bot to do other things while 
          getting reactions*/
        const collector = message.createReactionCollector(filter, { time: 600000 });

        // when a reaction is received
        collector.on('collect', (reaction, user) => {
          message.reactions.cache.get(reaction.emoji.name).remove().catch(error => console.error("Failed to removed"));
          playerMove(reaction, message);
          if (checkWinner()){
            collector.stop();
          }
        });

        // when the collector is over
        collector.on('end', collected => {
          console.log(`Collected ${collected.size} items`);
        });
      });

  }
}

    