//#!/usr/bin/env node
const program = require('commander');
const {prompt} = require('inquirer');
const shell = require('shelljs');
const {
    createDatabase,
    addCommand,
    updateCommand,
    findCommandByName,
    findAllCommands,
    findCommandById
} = require('./index');

// Configure the database of commands
createDatabase('extorcli.db3');

// Command questions
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Command name'
    },
    {
        type: 'input',
        name: 'command',
        message: 'Command that will be executed'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Command description'
    }
];

// Show the version of CLI
program
    .version('1.0.0')
    .description('Version of Extor CLI');

// Add a new command
program
    .command('add')
    .alias('a')
    .description('Add a new command')
    .action(() => {
        prompt(questions).then(answars => {
            var id = addCommand('extorcli.db3', answars);
            if(id > 0)
                console.log('===> Command created...');
            else
                console.log('===> Command creation failed...');
        });
    });

// Update a new command
program
    .command('update <_name>')
    .alias('u')
    .description('Update a command')
    .action((_name) => {
        var cmd = findCommandByName('extorcli.db3', _name);
        if(cmd.length > 0){
            prompt(questions).then(answars => {
                    var id = updateCommand('extorcli.db3', answars, cmd[0].id);
                    if(id == 0)
                        console.log('===> Command updated...');
                    else
                        console.log('===> Command update failed...');
            });
        } else {
            console.log('==> Command not found...');
        }
    });

// Show the info of a command
program
    .command('info <name>')
    .alias('i')
    .description('Show a command info')
    .action((name) => {
        var cmd = findCommandByName('extorcli.db3', name);
        if(cmd.length > 0){
            console.log('==> Command info');
            console.log('');
            console.log('   Name: ' + cmd[0].name);
            console.log('   Command: ' + cmd[0].command);
            console.log('   Description: ' + cmd[0].description);
            console.log('');
        } else {
            console.log('==> Command not found...');
        }
    });

// Show the info of all commands
program
    .command('all')
    .description('Show all commands info')
    .action(() => {
        var cmd = findAllCommands('extorcli.db3');
        if(cmd.length > 0){
            console.log('==> List of all commands');
            console.log('');
            for(var i = 0; i < cmd.length; i++){
                console.log('==> Command info');
                console.log('   Name: ' + cmd[0].name);
                console.log('   Command: ' + cmd[0].command);
                console.log('   Description: ' + cmd[0].description);
            }
            console.log('');
        } else {
            console.log('==> Command not found...');
        }
    });

// Execute a command
program
    .command('exec <name>')
    .alias('e')
    .description('Execute a command')
    .action((name) => {
        var cmd = findCommandByName('extorcli.db3', name);
        if(cmd.length > 0){
            console.log('==> Executing: ' + cmd[0].command);
            console.log('');
            shell.exec(cmd[0].command);
            console.log('');
            console.log('==> Executed: ' + cmd[0].command);
        } else {
            console.log('==> Command not found...');
        }
    });

// Parse the input arguments
program.parse(process.argv);