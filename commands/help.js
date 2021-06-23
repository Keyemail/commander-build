//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Command handler || DO NOT MESS WITH
module.exports= {
    name: 'help',
    descriptions: 'this is a help command',
    cooldown: 5,
    execute(client, message, args, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        const helpEmbed = new Discord.MessageEmbed()
            .addFields(
                { name: 'cm!ban', value: 'This is a command where you can ban any member, you must have the BAN or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!kick', value: 'This is a command where you can kick any member, you must have the KICK or ADMINISTRATOR permissions to execute it.'},
                { name: 'cm!kick', value: 'This is a command where you can kick any member, you must have the KICK or ADMINISTRATOR permissions to execute it.'},
            )

    }
}