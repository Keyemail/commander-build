//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Modules
const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();


//Config
const client = new Discord.Client();

//Command Handler
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Connected to the MongoDB database!');
})
.catch((err) => {
    console.log(`Something went wrong while connecting to the MongoDB database, more details here: ${err}`);
});

//extra
client.login(process.env.token)