module.exports = {
  name: 'kick',
  description: 'Responds to user input when command ping is given',
  usage: 'user reason',
  guildOnly: true,
  execute (message, args) {
    // guild id 550318319341797388
    // Kick user with specified id.
    let id = args[0]
    let idLength = id.length
    let realId = id.substring(2, idLength - 1)
    let kickReason = args[1]
    if (kickReason === undefined) {
      kickReason = ' No reason.'
    } else {
      kickReason = ''
      for (let i = 1; i < args.length; i++) {
        kickReason += ' ' + args[i]
      }
    }
    message.channel.members.get(realId).kick(`${id}`)
      .then(message.channel.send(`Kicked user: ${id} Reason: ${kickReason}`))
  }
}
