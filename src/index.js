var sqlite = require('sqlite-sync');
 
const createDatabase = (dbName) => {
    // Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);
 
    // Create table of commands
    sqlite.run("CREATE TABLE commands (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, command TEXT NOT NULL, description TEXT NOT NULL);");
    sqlite.run("CREATE UNIQUE INDEX idx_unique_name on commands (name);")
}

const addCommand = (dbName, cmd) => {
    //Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);

    // Insert command on table
    return sqlite.insert('commands',{name: cmd.name, command: cmd.command, description: cmd.description});
}

const updateCommand = (dbName, cmd, id) => {
    //Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);

    // update command on table
    return sqlite.update('commands',{name: cmd.name, command: cmd.command, description: cmd.description}, {id: id});
}

const findAllCommands = (dbName) => {
    //Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);

    // Return de commands from table
    return sqlite.run('SELECT * FROM commands');
}

const findCommandById = (dbName, id) => {
    //Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);

    // Return de commands from table
    return sqlite.run('SELECT * FROM commands WHERE id = ?',[id]);
}

const findCommandByName = (dbName, name) => {
    //Connecting
    sqlite.connect(process.env.HOME + '/' + dbName);

    // Return de commands from table
    return sqlite.run('SELECT * FROM commands WHERE name = ?',[name]);
}

module.exports = {
    createDatabase,
    addCommand,
    updateCommand,
    findCommandByName,
    findAllCommands,
    findCommandById
};