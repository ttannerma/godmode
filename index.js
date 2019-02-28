const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const cooldowns = new Discord.Collection()

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
  // Check if the cooldowns Collection has the command set in it yet. If not, then add it in.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  // A variable with the current timestamp.
  const now = Date.now()
  // A variable that gets the Collection for the triggered command.
  const timestamps = cooldowns.get(command.name)
  // A variable that gets the necessary cooldown amount. If you don't supply it in your command file, it'll default to 3.
  const cooldownAmount = (command.cooldown || 3) * 1000

  // Check if the timestamps Collection has the author ID in it yet.
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
    }
  } else {
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
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
