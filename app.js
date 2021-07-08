const readline = require('readline');
const fs = require('fs');
const DiscordRPC = require('discord-rpc'); 
const { title } = require('process');
const client = new DiscordRPC.Client({ transport: 'ipc' }); 
const prompt = require('prompt-sync')();
require('dotenv').config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Hello, this is an interactive CLI made by Rexurection! How does this work? It\'s pretty simple, we create a template for your discord rich presence!\n\nType "1" if you want to create a project.\n\nType "2" if you want to start an already existing rich presence.\n\nSo, what\'s your choice? : ', (answer) => {
    if (answer == "1") {
        rl.close();
        console.log('Alright, let\'s do this!');
        console.log('We will be super fast!')
        
        

        const title = prompt('So, what will the title be? : ')
        
        const description = prompt('So, what will the description be? : ')

        const appID = prompt('I need your developer portal settings/application ID! If you don\'t have one go to https://discord.com/developers/applications\n\nSo, what\'s your application ID? : ')    

        let applID = `applicationID=${appID}\ndescription=${description}\ntitle=${title}`

        

        console.log('Perfect, now save your image for the rich presence as "rpc_icon" or else no image will show! D:')
        const finished = prompt('You have now succesfully made your rich presence, to start it press ENTER and reload the program, at the startup type "2" and you\'re good to go!\n\nEnjoy your rpc! Proudly made by Rexurection#0001/@Rexurection on telegram.');
        fs.writeFile('.env', applID, (err) => {
            if (err) throw err;

            console.log(' ')
        })
    } else if (answer == "2") {
        rl.close();
        console.log('Alright, let\'s do this!');
        (async () => {
            client.on('ready', async () => { 
                await client.setActivity({ 
                    details: process.env.title,
                    state: process.env.description,
                    startTimestamp: 1,
        
                }).catch(err => console.log(err));
               
                console.log("\x1b[31m","\nRPC online, don't close this window!");
                console.log("\x1b[0m", "");
            });
        
            await client.login({ clientId: process.env.applicationID }).catch(console.error); 
        })();
    } else {
        rl.close();
        console.log('Please select one of the two choices!')
    }
})