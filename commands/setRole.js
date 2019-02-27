module.exports = {
  name: 'set-role',
  description: 'Sets role for given user.',
  execute (message, args) {
    message.channel.send(`Setting role ${args[0]} for user: ${args[1]}`)
  }
}
