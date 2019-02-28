module.exports = {
  name: 'args-info',
  description: 'Information about the arguments provided.',
  usage: 'param1 param2... param 5',
  execute (message, args) {
    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
  }
}
