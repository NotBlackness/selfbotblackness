// handlers/messageCreate.js

const commandHandler = require('./commandHandler');
const afkCommand = require('../commands/afk');
const emojis = ['🚀', '🌟', '✨', '💥', '🔥', '⚡', '🎉', '🎊'];
const config = require('../config');

const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

module.exports = (client) => {
    client.on('messageCreate', async message => {
        if (!message.author || message.author.bot) return;

        const { prefix, allowedUserIDs, allowedNoPrefixUserIDs } = config;
        const content = message.content.trim();
        const isPrefixed = content.startsWith(prefix);

        // Check for AFK mentions
        const afkUsers = afkCommand.getAfkUsers();

        // Respond to mentions if the mentioned user is AFK
        if (message.mentions.users.size > 0) {
            message.mentions.users.forEach(user => {
                if (afkUsers[user.id]) {
                    message.channel.send(`${afkUsers[user.id]}`);
                }
            });
        }

        // Check if it's a DM and the recipient is AFK
        if (message.channel.type === 'dm' && afkUsers[message.author.id]) {
            message.reply(`${afkUsers[message.author.id]}`);
            return; // Exit since we don't handle commands in DM here
        }

        // Extract command name and arguments
        const commandName = isPrefixed
            ? content.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
            : content.split(/ +/).shift().toLowerCase();

        const command = commandHandler.getCommand(commandName);
        if (!command) return;

        if (!allowedUserIDs.includes(message.author.id)) {
            return message.channel.send("You are not allowed to use this command.").catch(console.error);
        }

        const args = isPrefixed
            ? content.slice(prefix.length).trim().split(/ +/).slice(1)
            : content.split(/ +/).slice(1);

        if (!isPrefixed && !allowedNoPrefixUserIDs.includes(message.author.id)) {
            return message.channel.send("You are not allowed to use commands without a prefix.").catch(console.error);
        }

        // Execute the command
        try {
            await command.execute(message.channel, message, client, args);
            console.log(`Executed command: ${commandName} ${getRandomEmoji()}`);
        } catch (error) {
            console.error(`Error executing command: ${commandName}`, error);
            message.channel.send("There was an error executing that command.").catch(console.error);
        }
    });
};
