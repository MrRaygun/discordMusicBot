module.exports = {
  name: 'hello',
  description: "This will cause the bot to say Hello World back to you",
  execute(message, args){
    message.channel.send('Hello World!'); // says hello World
  }
}