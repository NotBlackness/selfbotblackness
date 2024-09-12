module.exports = {
    name: 'status',
    description: 'Sets the bot\'s status.',
    /**
     * Executes the status command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        // Check if the user has provided a status type and status message
        if (args.length < 2) {
            return message.channel.send('Please provide the status type and message. Usage: !status <type> <message>').catch(console.error);
        }

        const type = args[0].toLowerCase();
        const statusMessage = args.slice(1).join(' ');

        // Valid status types
        const validTypes = {
            playing: 'PLAYING',
            streaming: 'STREAMING',
            listening: 'LISTENING',
            watching: 'WATCHING'
        };

        // Check if the provided type is valid
        if (!validTypes[type]) {
            return message.channel.send('Invalid status type. Available types: playing, streaming, listening, watching.').catch(console.error);
        }

        // Set the bot's status based on the provided type and message
        client.user.setActivity(statusMessage, { type: validTypes[type], url: type === 'streaming' ? 'https://twitch.tv/yourchannel' : null });

        // Send confirmation message
        message.channel.send(`Status set to "${statusMessage}"`).catch(console.error);
    }
};
