//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Module export, DO NOT MESS WITH
module.exports= {
    name: 'kick',
    descriptions: 'this is a kick command',
    execute(message, args, cmd, client, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        //Checks if a user was mentioned, if not it will display the help section
        if(!args[0]){
            const noArgsFound = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to kick a member'},
                    { name: 'Example:', value: 'cm!kick @Keyemail reason'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF');
            message.channel.send(noArgsFound)  ; 
        return;             
        }

        //Checks if the user has permissions to do this command
        if (!message.member.permissions.has('KICK_MEMBERS' || 'ADMINISTRATOR')) {
            const noPermissions = new Discord.MessageEmbed()
            .setDescription(`${crossmark}  You must have "KICK MEMBERS" or "ADMINISTRATOR" permissions in your role to use this command.`)
            .setColor('#D64D50')
        message.channel.send(noPermissions)
        return;
        }

        //Finds member and sets up the kick reason
        const member = message.mentions.users.first();
        var kickReason = args.slice(1).join(' ');

        //If the user did not set a kick reason then return to "No reason."
        if(!args[1]){
            var kickReason = 'No reason.';
        }

        //Where the user gets kicked
        if(member) {
            const memberTarget = message.guild.members.cache.get(member.id); //Finds the mentioned user and stores them into cache
                memberTarget.kick().then(() =>{ //Kicks the user
                const kickEmbed = new Discord.MessageEmbed() //Embed for the kick
                    .setDescription(`${checkmark}  ${member.tag} has been kicked for ${kickReason}`)
                    .setColor('#3FC45E');
                message.channel.send(kickEmbed); //Sends to channel notifying that the kick was a success
                console.log(`KICK: ${member.tag} has been kicked from ${message.guild.name} for ${kickReason}`);
        }) .catch(err=>{ //Catches any errors regarding role permissions
                const errorkickEmbed = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  Error while kicking user. The most common error is user having a higher role then the bot.`)
                    .addFields(
                        { name: 'Description:', value: 'Allows a user to kick a member'},
                        { name: 'Example:', value: 'cm!kick @Keyemail reason'},
                        { name: 'Cooldown:', value: '5 Seconds'},
                    )
                    .setColor('#D64D50')
                message.channel.send(errorkickEmbed)
                console.log(`ERROR: There was a error while kicking a user, error code details: ${err}`)
            });
            //If the user that was entered as false or incorrect then proceed to send this
            } else {
                const noUserEmbed = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  You did not specify which user need to be kicked.`)
                    .addFields(
                        { name: 'Description:', value: 'Allows a user to kick a member'},
                        { name: 'Example:', value: 'cm!kick @Keyemail reason'},
                        { name: 'Cooldown:', value: '5 Seconds'},
                    )
                    .setColor('#D64D50')
                message.channel.send(noUserEmbed)
        }
    }
}