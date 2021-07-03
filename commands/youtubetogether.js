//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

const fetch = require('node-fetch');

//Module export, DO NOT MESS WITH
module.exports = {
    name: 'yt',
    description: "this is a youtube together command",
    cooldown: 5,
    async execute(message, args, cmd, client, Discord){

    let channel = message.member.voice.channel;
    if(!channel){
        const notInVoiceChannel = new Discord.MessageEmbed()
            .setDescription(`${crossmark}  You're not in a voice channel, to start a YouTube Together you MUST be in a voice channel.`)
            .setColor('#D64D50')
        return message.channel.send(notInVoiceChannel)
    } 

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code){
            const inviteLinkDidNotWork = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  Could not generate a invite link. Something went wrong, try again.`)
                .setColor('#D64D50')
            return message.channel.send(inviteLinkDidNotWork)
        } 
        const activityLink = new Discord.MessageEmbed()
            .setDescription(`${checkmark}  YouTube Together has started by ${message.author.username}, [Click me to join the activity!](https://discord.com/invite/${invite.code})`)
            .setColor('#0072FF');
        message.channel.send(activityLink)
    })
}
}