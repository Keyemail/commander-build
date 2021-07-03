//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Module export, DO NOT MESS WITH
module.exports = {
    name: 'mute',
    description: "This mutes a member",
    cooldown: 5,
    async execute(message, args, cmd, client, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        //If no other arguments found, tell the user what the command does
        if(!args[0]){
            const noArgsFound = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to mute a member'},
                    { name: 'Example:', value: 'cm!mute @Keyemail time reason'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF');
            return message.channel.send(noArgsFound);
            }

        const target = message.mentions.users.first(); //Finds the target that was pinged

        if(target){ //if user found then do this
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute'); //Finds the mute role

            if(!muteRole){
                message.guild.roles.create({
                    data: {
                        name: 'mute',
                        color: 'GRAY',
                    },
                    reason: 'no mute role was found'
                })
                const noRoleWasFoundEmbed = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  No mute role was found so we created one for you, make sure to config the role to make it actually stop the user from texting! Run the command again to mute that user!`)
                    .setColor("#D64D50")
                return message.channel.send(noRoleWasFoundEmbed)
            }

            let memberTarget = message.guild.members.cache.get(target.id); //Cache the user and grab the ID of the user

            memberTarget.roles.add(muteRole.id) //Adds the mute role

            const personWasMuted = new Discord.MessageEmbed()
                .setDescription(`${checkmark}  <@${memberTarget.user.id}> has been succesfully muted!`)
                .setColor('#3FC45E');
            message.channel.send(personWasMuted);
        } else { //if user was not found then do this
            const couldNotFindUserEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  The user you were trying to mute was not found.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to mute a member'},
                    { name: 'Example:', value: 'cm!mute @Keyemail time reason'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            message.channel.send(couldNotFindUserEmbed);
        }
    }
}