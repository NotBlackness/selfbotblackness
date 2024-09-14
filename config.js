const { readFileSync } = require('fs');

module.exports = {
    token: process.env.token || readFileSync('token.txt', 'utf-8'),
    prefix: ";",
    allowedUserIDs: ['1117657817768267984', '#', '#'], // Replace '#' with actual user IDs
    allowedNoPrefixUserIDs: ['1117657817768267984'], // Users allowed to use commands without a prefix
    ltcAddress: 'LcPnFkTa5UTav5Ue3dM6GdLh7LpTm47JZx',
    paypalID: 'your-paypal-id@example.com'
};