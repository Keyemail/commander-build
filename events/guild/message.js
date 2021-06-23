require('dotenv').config()

const cooldowns = new Map();

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';

module.exports = (Discord, client, message) => {
    const prefix = process.env.prefix
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || 
                    client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            const coolDownTimeEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  Please wait ${time_left.toFixed(1)} more seconds before you can use the ${command.name} command!`)
                .setColor('#D64D50');
            return message.reply(coolDownTimeEmbed);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try {
        command.execute(message, args, cmd, client, Discord);
    } catch (err) {
       console.log;
       return;
    }
    
}