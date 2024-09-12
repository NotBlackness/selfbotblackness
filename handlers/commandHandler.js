const fs = require('fs');
const path = require('path');

const commands = {};

const loadCommands = () => {
    const baseDir = path.join(__dirname, '../commands');

    const readCommands = (dir) => {
        return fs.readdirSync(dir).filter(file => file.endsWith('.js')).map(file => require(path.join(dir, file)));
    };

    // Clear the commands object before loading to prevent duplicates
    for (const key in commands) {
        delete commands[key];
    }

    // Load commands from the root /commands directory
    const rootCommands = readCommands(baseDir);
    commands['root'] = rootCommands;
    rootCommands.forEach(command => {
        console.log(`Loaded command: root/${command.name}`);
    });

    // Load commands from subdirectories
    const commandCategories = fs.readdirSync(baseDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    commandCategories.forEach(categoryDir => {
        const category = categoryDir.name;
        const commandsInCategory = readCommands(path.join(baseDir, category));
        commands[category] = commandsInCategory;
        commandsInCategory.forEach(command => {
            console.log(`Loaded command: ${category}/${command.name}`);
        });
    });
};

const getCommand = (commandName) => {
    for (const category in commands) {
        const command = commands[category].find(cmd => cmd.name === commandName);
        if (command) return command;
    }
    return null;
};

module.exports = {
    loadCommands,
    getCommand,
    commands
};
