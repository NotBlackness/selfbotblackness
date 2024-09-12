// commands/afk.js

let afkUsers = {}; // Object to store AFK statuses

module.exports = {
    name: 'afk',
    description: 'Sets your AFK status and message.',
    execute(channel, message, client, args) {
        const userID = message.author.id;

        // Toggle AFK status
        if (afkUsers[userID]) {
            // Remove AFK status if already AFK
            delete afkUsers[userID];
            message.channel.send(`Welcome back, ${message.author.username}! You are no longer AFK.`);
        } else {
            // Set AFK status with a message
            const afkMessage = args.length > 0 ? args.join(' ') : "I'm currently away. I will get back to you soon.";
            afkUsers[userID] = afkMessage;
            message.channel.send(`You are now AFK: ${afkMessage}`);
        }
    },
    getAfkUsers() {
        return afkUsers;
    }
};
