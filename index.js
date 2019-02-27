const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('ready!')
})

client.on('message', message => {
  // If message doesnt start with prefix OR author is bot then exit early.
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // Create args variable that slices off the prefix entirely and then splits the command message into an array by spaces.
  const args = message.content.slice(prefix.length).split(/ +/)

  // Create command variable by shifting it away from original array and make it lowercase.
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) return

  try {
    client.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
})

client.login(token)
