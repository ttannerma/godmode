module.exports = {
  name: 'ping',
  description: 'Responds to user input when command ping is given',
  usage: '<prefix>ping',
  cooldown: 5,
  execute (message, args) {
    message.channel.send('Pong.')
  }
}
