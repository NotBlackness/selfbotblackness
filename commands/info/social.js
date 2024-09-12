module.exports = {
    name: 'social',
    description: 'Displays the user\'s social media links.',
    /**
     * Executes the social command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        // Delete the command message
        message.delete().catch(console.error);

        // Define the user's social media links
        const socialLinks = `
        📱 **Follow me on my Socials** 📱

        ✈️ Telegram: [t.me/username](https://t.me/username)
        🛠️ Discord: **username**
        📸 Instagram: [username](https://www.instagram.com/username/)
        `;

        // Send the social media links message
        message.channel.send(socialLinks).catch(console.error);
    }
};
