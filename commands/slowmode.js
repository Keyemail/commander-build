//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

module.exports = {
    name: 'slowmode',
    description: "this is a slowmode command",
    cooldown: 5,
    async execute(message, args, cmd, client, Discord){

        //Checks if command is being used in a DM
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!");
            return;
        }

        //Checks if a user was mentioned, if not it will display the help section
        if(!args[0]){
            const noArgsFound = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to set a slowmode '},
                    { name: 'Example:', value: 'cm!slowmode 10'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF');
            return message.channel.send(noArgsFound)   ;           
        }

        if(isNaN(args[0])){
            const notRealNumberEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  This is not a number, you must specify a number.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to set a slowmode '},
                    { name: 'Example:', value: 'cm!slowmode 10'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            return message.channel.send(notRealNumberEmbed)
        }

        //Checks if number is over 100
        if(args[0] > 21600){
            const overLimitEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  You may not set the slowmode time over 21600 seconds.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                    { name: 'Example:', value: 'cm!clear 0-100'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            return message.channel.send(overLimitEmbed)
        }

        //Check if number is below 1
        if(args[0] < 1){
            const underLimitEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  You must set at least 1 or more seconds to activate slowmode.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                    { name: 'Example:', value: 'cm!clear 0-100'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            return message.channel.send(underLimitEmbed)
        }

        //Checks if the user has permissions to do this command
        if (!message.member.permissions.has('MANAGE_CHANNELS' || 'ADMINISTRATOR')) {
            const noPermissions = new Discord.MessageEmbed()
            .setDescription(`${crossmark}  You must have "MANAGE CHANNEL" or "ADMINISTRATOR" permissions in your role to use this command.`)
            .setColor('#D64D50');
        return message.channel.send(noPermissions);
        }

        message.channel.setRateLimitPerUser(args[0]).catch(err => {
            console.log(`FAILED TO SET SLOWMODE, MORE DETAILS STATE: ${err}`);
            const failedToSetRateLimitEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  Failed to set the rate limit, please try again`)
                .setColor("#D64D50");
            return message.channel.send(failedToSetRateLimitEmbed);
        });

        const setRateLimitEmbed = new Discord.MessageEmbed()
            .setDescription(`${checkmark}  Set the rate limit to ${args[0]} seconds!`)
            .setColor(`#3FC45E`);
        message.channel.send(setRateLimitEmbed);

    }
}