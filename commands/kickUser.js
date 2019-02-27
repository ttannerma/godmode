module.exports = {
  name: 'kick',
  description: 'Responds to user input when command ping is given',
  execute (message, args) {
    message.channel.send(`Kick user: ${args[1]}`)
  }
}
