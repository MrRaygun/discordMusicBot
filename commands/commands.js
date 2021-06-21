module.exports = {
  name: 'commands',
  description: "Tells the user what are some possible commands",
  execute(message, args){

    // sets up a varible with all the command descriptions, so it is sent quicker
    var command = "";
    command+="Commands include:\n";
    command+="ping => pong\n";
    command+="hello => hello world!\n";
    command+="fart => makes the bot fart\n";
    command+="fart_play => joins VC and plays fart sounds for an hour\n";
    command+="moan_play => joins VC and plays Lisa moaning for an hour\n";
    command+="\tstop => If sound_play is active, then the bot will stop the sound and leave the channel\n"
    command+="repeat => repeats what the user says\n";
    command+="convertbi => converts any piece of 8 bit binary into english\n";
    command+="convertstr => converts any piece of english into binary (tinkering with ways to prevent spamming)\n";
    command+="tic_tac_toe => begins a game between you and the computer (Not complete)";

    message.channel.send(command);
  }
}