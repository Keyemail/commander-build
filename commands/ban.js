//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Command handler || DO NOT MESS WITH
module.exports= {
    name: 'ban',
    descriptions: 'this is a ban command',
    cooldown: 5,
    execute(message, args, cmd, client, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        //Checks if a user was mentioned, if not it will display the help section
        if(!args[0]){
            const errorBanEmbed = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to ban a member'},
                    { name: 'Example:', value: 'cm!ban @Keyemail reason'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF')
            message.channel.send(errorBanEmbed)   
        return;             
        }

        //Checks if the user has permissions to do this command
        if (!message.member.permissions.has('BAN_MEMBERS' || 'ADMINISTRATOR')) {
            const noPermissions = new Discord.MessageEmbed()
            .setDescription(`${crossmark}  You must have "BAN MEMBERS" or "ADMINISTRATOR" permissions in your role to use this command.`)
            .setColor('#D64D50')
        message.channel.send(noPermissions)
        return;
        }

        //Finds member and sets up the ban reason
        const member = message.mentions.users.first();
        var banReason = args.slice(1).join(' ');

        //If the user did not set a ban reason then return to "No reason."
        if(!args[1]){
            var banReason = 'No reason.';
        }

        //Where the user gets banned
        if(member) {
            const memberTarget = message.guild.members.cache.get(member.id); //Finds the mentioned user and stores them into cache
                memberTarget.ban({reason: banReason}).then(() =>{ //Bans the user and puts in the ban reason
                const banEmbed = new Discord.MessageEmbed() //Embed for the ban
                    .setDescription(`${checkmark}  ${member.tag} has been banned for ${banReason}`)
                    .setColor('#3FC45E');
                message.channel.send(banEmbed); //Sends to channel notifying that the ban was a success
                console.log(`BAN: ${member.tag} has been banned from ${message.guild.name} for ${banReason}`);
        }) .catch(err=>{ //Catches any errors regarding role permissions
                const errorBanEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  Error while banning user. The most common error is user having a higher role then the bot.`)
                .addFields(
                        { name: 'Description:', value: 'Allows a user to ban a member'},
                        { name: 'Example:', value: 'cm!ban @Keyemail reason'},
                        { name: 'Cooldown:', value: '5 Seconds'},
                    )
                    .setColor('#D64D50')
                message.channel.send(errorBanEmbed)
                console.log(`ERROR: There was a error while banning a user, error code details: ${err}`)
            });
            //If the user that was entered as false or incorrect then proceed to send this
            } else {
                const noUserEmbed = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  You did not specify which user need to be banned.`)
                    .addFields(
                        { name: 'Description:', value: 'Allows a user to ban a member'},
                        { name: 'Example:', value: 'cm!ban @Keyemail reason'},
                        { name: 'Cooldown:', value: '5 Seconds'},
                    )
                    .setColor('#D64D50')
                message.channel.send(noUserEmbed)
            }       
        }
    }