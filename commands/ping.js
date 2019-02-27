module.exports = {
  name: 'ping',
  description: 'Responds to user input when command ping is given',
  execute (message, args) {
    message.channel.send('Pong.')
  }
}
