//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

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

        if(!args[0]){
            const noFirstArgumentEmbed = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to mute a member'},
                    { name: 'Example:', value: 'cm!mute @Keyemail time reason'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF')
            message.channel.send(noFirstArgumentEmbed)
            }

        const target = message.mentions.users.first();

        if(target){
            var muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            if(!muteRole){
                message.guild.roles.create({
                    data: {
                        name: 'mute',
                        color: 'GRAY',
                    },
                    reason: 'no mute role was found'
                })
                
                return message.channel.send(noMuteRoleFound)
            }

            var muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(muteRole.id)

            const personWasMuted = new Discord.MessageEmbed()
                .setDescription(`<@${memberTarget.user.id}> has been succesfully muted!`)
                .setColor('#3FC45E');
            message.channel.send(personWasMuted);
        } else {
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