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
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return

  const command = client.commands.get(commandName)

  // If command is for channel use only and not DM's then stop execution and display message.
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply(`I can't execute that command inside DMs!`)
  }

  try {
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
      }
      return message.channel.send(reply)
    } else command.execute(message, args)
  } catch (error) {
    message.channel.send('Error executing command!')
  }
})

client.login(token)
