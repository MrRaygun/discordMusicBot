module.exports = {
  name: 'convertBi',
  description: "The bot converts anything in 8 bit binary to words",
  execute(message, args){
    
    // checks to see if the message can work
    function canWork(formalOldMessage)
    {
      // checks to see if every letter is a '1' or a '0'
      for (i=0; i<formalOldMessage.length; i++)
      {
        if (formalOldMessage[i] != '1' && formalOldMessage[i] != '0')
        {
          message.channel.send("Every letter must be either a '0' or a '1'");
          return false;
        }
      }

      if (formalOldMessage.length % 8 != 0)
      {
        message.channel.send("Must use a 8 bit system");
        return false;
      }
      return true;
    }

    // returns a list of each byte
    function seperateBytes(formalOldMessage)
    {
      var lst = [];
      for (i=0; i<formalOldMessage.length; i+=8)
      {
        lst.push(formalOldMessage.slice(i,i+8));
      } 
      return lst;
    }

    if (message.content.length > 10)
    {
      // serperate the message from the command
      let oldMessage = message.content.slice(message.content.indexOf('i')+2);
    
      // remove all spaces, meaning group together all the '1's and '0's
      oldMessage = oldMessage.replace(/ /g, '');
      
      // check if you can use the message
      if (canWork(oldMessage))
      {
        // serperate each byte into a differnt index of a list
        oldMessage = seperateBytes(oldMessage);

        // create the new string
        let newMessage = "";
        for (i=0; i<oldMessage.length; i++)
        {
          newMessage += String.fromCharCode(parseInt(oldMessage[i], 2));
        }

        // checks if the message is blank
        if (newMessage === "")
        {
          newMessage = "...";
        }

        // send the new string to discord
        message.channel.send(newMessage);
      }
    }
  }
}