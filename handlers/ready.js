const AsciiTable = require('ascii-table');
const figlet = require('figlet');

module.exports = (client) => {
    client.on('ready', () => {
        // Generate "Logged in as" message in a smaller font
        figlet.text('Logged in as', {
            font: 'Mini',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (err, loggedInAscii) => {
            if (err) {
                console.error('Error generating ASCII art:', err);
                return;
            }
            
            // Print the "Logged in as" message
            console.log(loggedInAscii);

            // Generate username in the Slant font
            figlet.text(client.user.tag, {
                font: 'Speed',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, (err, usernameAscii) => {
                if (err) {
                    console.error('Error generating ASCII art:', err);
                    return;
                }

                // Print the username in Slant font
                console.log(usernameAscii);

                // Create a new ASCII table
                const table = new AsciiTable();
                table.setBorder('║', '═', '✿', '✿'); // Using decorative characters as border
                table.setTitle('Activated');

                // Add rows to the table with bot status information
                table
                    .addRow('Guilds', ' '.repeat(10) + client.guilds.cache.size)
                    .addRow('Channels', ' '.repeat(10) + client.channels.cache.size)
                    .addRow('Users', ' '.repeat(10) + client.users.cache.size);

                // Print the table
                console.log(table.toString());
            });
        });
    });
};
