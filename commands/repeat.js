module.exports = {
  name: 'repeat',
  description: "The bot repeats what the user puts after the '-repeat' ",
  execute(message, args){
    if (message.content.length > 7)
    {
      message.channel.send(message.content.slice(message.content.indexOf('t')+1));
    }
  }
}