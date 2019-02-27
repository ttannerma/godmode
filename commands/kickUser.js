module.exports = {
  name: 'kick',
  description: 'Responds to user input when command ping is given',
  guildOnly: true,
  execute (message, args) {
    // guild id 550318319341797388
    // Kick user with specified id.
    let id = args[0]
    let idLength = id.length
    let realId = id.substring(2, idLength - 1)
    // console.log(realId)
    message.channel.members.get(realId).kick(`${args[1]}`).then(message.channel.send(`Kicked user: ${args[1]} Reason: ${args[1]}`)).catch(message.channel.send('Could not kick user.'))
  }
}
