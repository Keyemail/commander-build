//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Module export, DO NOT MESS WITH
module.exports= {
    name: 'help',
    descriptions: 'this is a help command',
    cooldown: 5,
    execute(message, args, cmd, client, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
            .setTitle(`**These are the commands that are available to use!**`)
            .addFields(
                { name: 'cm!ban', value: 'This is a command where you can ban any member, you must have the BAN MEMBERS or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!kick', value: 'This is a command where you can kick any member, you must have the KICK MEMBERS or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!slowmode', value: 'This is a command where you can set slowmode on any channel, you must have the MANAGE CHANNEL or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!clear', value: 'This is a command where you can clear chat messages, you must have the MANAGE MESSAGES or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!mute', value: 'This is a command where you can mute any members you wish to mute, you must have the MANAGE MESSAGES or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!yt', value: 'This is a command where you can play a youtube video and other people can join in, you have to make sure you give YouTube Together authorization of your Discord account or it will not work! If you dont see the popup try doing it in a browser instead of the client.'}
            )
            .setColor('#0072FF')
            .setFooter(`©2021 Commander, all rights reserved`);
        message.author.send(helpEmbed);

        const SentToDMSEmbed = new Discord.MessageEmbed()
            .setDescription(`${checkmark}  Check your Direct Messages, the list of commands are there!`)
            .setColor(`#3FC45E`);
        message.channel.send(SentToDMSEmbed);
    }
}