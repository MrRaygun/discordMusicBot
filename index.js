const Discord = require('discord.js');

const client  = new Discord.Client();

const prefix = '-';

const fs = require('fs');

const keepAlive = require("./server");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles)
{
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', ()=>{
  console.log("Bot tester is live");
});

client.on('message', message =>{
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command)
  {
    case 'commands':
      client.commands.get('commands').execute(message, args);
      break;
    case 'ping':
      client.commands.get('ping').execute(message, args);
      break;
    case 'hello':
      client.commands.get('hello').execute(message, args);
      break;
    case 'repeat':
      client.commands.get('repeat').execute(message, args);
      break;
    case 'convertbi':
      client.commands.get('convertBi').execute(message, args);
      break;
    case 'convertstr':
      client.commands.get('convertStr').execute(message, args);
      break;
    case 'fart':
      client.commands.get('fart').fart(message, args);
      break;
    case 'tic_tac_toe':
      client.commands.get("tic_tac_toe").execute(message, args);
      break;
    case 'fart_play':
      client.commands.get('sound_commands').sound_play(message,"fartSounds1Hour.mp3" ,args);
      break;
    case 'moan_play':
      client.commands.get('sound_commands').sound_play(message,"LisaMoan1Hour.mp3" ,args);
      break;
    case 'lofi_play':
      client.commands.get('sound_commands').stream_play(message, 'https://www.youtube.com/watch?v=f2YZMsIX2VM', args);
      break;
    case 'stop':
      client.commands.get('sound_commands').sound_stop(message, args);
      break;
  }
});


keepAlive();

// make sure this is always the last line
const mySecret = process.env['DISCORD_BOT_TOKEN'];
client.login(mySecret);