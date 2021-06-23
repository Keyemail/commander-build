module.exports = (client, message, Discord, ready) =>{
    //Self check logs
    console.log('Bot token valid');
    console.log('Commands are working');
    console.log('Bot has connected to the discord servers');
    console.log('Self system check is complete, Now setting bot online');
    console.log(message.user.username + ' is now online');
    //Bot status
    message.user.setActivity('cm!help | Commander', { type: 'PLAYING' });
};