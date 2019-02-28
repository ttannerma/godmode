const { prefix } = require('../config.json')
module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute (message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      // Append commands to array.
      data.push('Here\'s a list of all my commands:')
      // .map() over the commands Collection.
      data.push(commands.map(command => command.name).join(', '))
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
      data.push(`For example: ${prefix}help kick`)

      // Send data array, use split: true that separates message if it reaches the character limit per message.
      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('I\'ve sent you a DM with all my commands!')
        })
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
          message.reply('it seems like I can\'t DM you! Do you have DMs disabled?')
        })
    } else {
      const name = args[0].toLowerCase()
      // Search the command based on given argument and search potential aliases for the command.
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

      if (!command) {
        return message.reply('that\'s not a valid command!')
      }

      // Display info on requested command.
      data.push(`**Name:** ${command.name}`)

      if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
      if (command.description) data.push(`**Description:** ${command.description}`)
      if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)

      data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

      message.channel.send(data, { split: true })
    }
  }
}
