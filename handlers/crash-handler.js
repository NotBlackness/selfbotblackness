module.exports = (client) => {
    process.on('uncaughtException', (error) => {
        console.error('Unhandled Exception:', error);
        // Optionally, try to inform a designated channel or admin about the crash.
        // const channelId = 'YOUR_CHANNEL_ID_HERE';
        // client.channels.cache.get(channelId)?.send(`🚨 An error occurred: ${error.message}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
        // Optionally, try to inform a designated channel or admin about the rejection.
        // const channelId = 'YOUR_CHANNEL_ID_HERE';
        // client.channels.cache.get(channelId)?.send(`🚨 Unhandled promise rejection: ${reason}`);
    });
};
