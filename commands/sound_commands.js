const path = require("path");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
var isOn = false;

module.exports = {
  name: "sound_commands",
  description: "Holds the commands for the bot's sound commands",

  sound_play(message,soundFile, args){ // if bot not moan in vc, than it will begin to fart
    const {voice} = message.member;

    if (!voice.channelID){ // must be in a voice channel
      message.reply("You must be in a voice channel");
      return;
    }

    voice.channel.join() // joins the vc
      .then(function (connection){
        // begins to play the sound
        const dispatcher = connection.play(path.join(__dirname, soundFile));
        isOn = true;

        // when the sound is done, than disconnect
        dispatcher.on('finish', () => {
	        connection.disconnect();
          isOn = false;
        });
      });
  },

  stream_play(message, link, args){
    const {voice} = message.member;

    if (!voice.channelID){ // must be in a voice channel
      message.reply("You must be in a voice channel");
      return;
    }
    
    voice.channel.join().then(connection => {  // joins the vc
        // begins to play the sound
        isOn = true;
          
        const dispatcher = connection.play(ytdl(link, {filter: "audioonly"}));

        // when the sound is done, than disconnect
        dispatcher.on('finish', () => {
          connection.disconnect();
          isOn = false;
        });
      });
    //});   
  },

  sound_stop(message, args){ // if bot is in vc, then it will stop
    if (isOn){
      if (!message.member.voice.channelID){ // must be in a vc to use it
        message.reply("You must be in the voice channel to stop me!");
        return;
      }
      message.member.voice.channel.leave(); // leaves the VC
      isOn = false;
    }
  }
}