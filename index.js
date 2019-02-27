const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')

client.once('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  // If message doesnt start with prefix OR author is bot then exit early.
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // Create args variable that slices off the prefix entirely and then splits the command message into an array by spaces.
  const args = message.content.slice(prefix.length).split(/ +/)

  // Output for "!ping" = [ 'ping' ]
  console.log(args)

  // Create command variable by shifting it away from original array and make it lowercase.
  const command = args.shift().toLowerCase()

  if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
    } else if (args[0] === 'foo') {
      return message.channel.send('Bar')
    }

    // message.channel.send(`First argument: ${args[0]}`)
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
})

client.login(token)
