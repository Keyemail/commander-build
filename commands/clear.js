//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

//Module export, DO NOT MESS WITH
module.exports= {
    name: 'clear',
    descriptions: 'this is a clear command',
    cooldown: 5,
    async execute(message, args, cmd, client, Discord){

        //If no other arguments found, tell the user what the command does
        if (message.channel instanceof Discord.DMChannel){
            message.channel.send("This command is not for Direct Messages. To use this command you must be in a server!")
            return;
        }

        //Checks if the user has put a number
        if(!args[0]){
            const specifyNumberEmbedEmbed = new Discord.MessageEmbed()
                .addFields(
                    { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                    { name: 'Example:', value: 'cm!clear 0-100'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor('#0072FF')
            return message.channel.send(specifyNumberEmbedEmbed)
        }

        //Checks if it is a number
        if(isNaN(args[0])){
            const notRealNumberEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  This is not a number, you must specify a number.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                    { name: 'Example:', value: 'cm!clear 0-100'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            return message.channel.send(notRealNumberEmbed)
        }

        //Checks if number is over 100
        if(args[0] > 100){
            const overLimitEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  You may not clear more then 100 messages, sorry.`)
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
                .setDescription(`${crossmark}  You must delete at least one message, sorry.`)
                .addFields(
                    { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                    { name: 'Example:', value: 'cm!clear 0-100'},
                    { name: 'Cooldown:', value: '5 Seconds'},
                )
                .setColor("#D64D50");
            return message.channel.send(underLimitEmbed)
        }

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{ //Awaits and cache the number of messages
            message.channel.bulkDelete(messages)//Delets the messages put
            .catch(err=>{//Catches if there are any errors to not crash your bot
                const errorkickEmbed = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  Error while deleting any messages, something went wrong.`)
                    .addFields(
                        { name: 'Description:', value: 'Allows a user to clear any amount in a text channel'},
                        { name: 'Example:', value: 'cm!clear 0-100'},
                        { name: 'Cooldown:', value: '5 Seconds'},
                    )
                    .setColor('#D64D50')
                message.channel.send(errorkickEmbed)
                console.log(`ERROR: There was a error while kicking a user, error code details: ${err}`)
            });

            const messageDeletedEmbed = new Discord.MessageEmbed()
                .setDescription(`${checkmark}  Deleted ${args[0]} messages in this channel!`)
                .setColor(`#3FC45E`)
            message.channel.send(messageDeletedEmbed).then(newMessage => newMessage.delete({timeout: 5000}));//Sends the messages saying it deleted it and deletes the message after 5 seconds
        
        })

    }

}