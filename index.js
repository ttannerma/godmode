const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')

client.once('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  if (message.content === prefix + 'ping') {
    console.log()
    message.channel.send('Pong.')
  }
})

client.login(token)
