//DO NOT MESS WITH THIS CODE IF UNEXPERIANCED, IF YOU MESS UP ONE LINE COULD CAUSE THE WHOLE COMMAND TO BREAK. PROCEED WITH CAUTION. NOTES ON THE LINES EXPLAIN WHAT THAT LINE IS FOR.

//Config Files
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

const checkmark = '<:checkmark:856176905643098122>';
const crossmark = '<:crossmark:856190653389471794>';
const diskSpinning = '<a:disk_spinning:856607594016669746>';

//Command handler || DO NOT MESS WITH
module.exports= {
    name: 'play',
    aliases: ["skip", "stop"],
    cooldown: 0,
    descriptions: 'this is a play command',
    async execute(message, args, cmd, client, Discord){

        const voice_channel = message.member.voice.channel;

        if(!voice_channel) {
            const notInVoiceEmbed = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  You are not in a voice channel currently.`)
                .setColor('#D64D50');
            return message.channel.send(notInVoiceEmbed);
        }

        const permissions = voice_channel.permissionsFor(message.client.user);

        if(!permissions.has('CONNECT')){
            const noPermissionsToConnect = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  This bot has no permissions to connect to the voice channel.`)
                .setColor('#D64D50');
            return message.channel.send(noPermissionsToConnect);
        }

        if(!permissions.has('SPEAK')){
            const noPermissionsToSpeak = new Discord.MessageEmbed()
                .setDescription(`${corssmark}  This bot has no permissions to speak to the voice channel.`)
                .setColor('#D64D50');
            return message.channel.send(noPermissionsToSpeak);
        }

        const server_queue = queue.get(message.guild.id);

        if(cmd === 'play'){
            if(!args.length){
                const noSongFound = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  You did not put a valid link to play!`)
                    .setColor('#D64D50');
                message.channel.send(noSongFound);
            }

            let song = {};

            if (ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else{
            const video_finder = async (query) =>{
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0]: null;
            }

            const video = await video_finder(args.join(' '));
            if(video){
                song = { title: video.title, url: video.url }
            } else {
            const errorWhileFindingSong = new Discord.MessageEmbed()
                .setDescription(`${crossmark}  Something went wrong trying to find your music!`)
                .setColor('#D64D50');
            message.channel.send(errorWhileFindingSong);
            }
        }

        if(!server_queue){

            const queue_constructor = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: [],
                highWaterMark: 512
            }
    
            queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);
    
            try {
                const connection = await voice_channel.join();
                queue_constructor.connection = connection;
                video_player(message.guild, queue_constructor.songs[0]);
            } catch (err) {
                queue.delete(message.guild.id);           
                const errorWhileConnecting = new Discord.MessageEmbed()
                    .setDescription(`${crossmark}  There was an error while connecting.`)
                    .setColor('#D64D50');
                message.channel.send(errorWhileConnecting);
                throw err;
            }
        } else{
            server_queue.songs.push(song);
            const songAddedOntoQueue = new Discord.MessageEmbed()
                .setDescription(`${checkmark}  ${song.title} has gotten added onto the queue!`)
                .setColor('#3FC45E');
            return message.channel.send(songAddedOntoQueue);
        }
    }
    else if(cmd === 'skip') skip_song(message, server_queue);
    else if(cmd === 'stop') stop_song(message, server_queue);
}
}

const Discord = require('discord.js')

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if(!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
        const stream = ytdl(song.url, { filter: 'audioonly'});
        song_queue.connection.play(stream, { seek:0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    const nowPlaying = new Discord.MessageEmbed()
        .setDescription(`${diskSpinning}  Now play ${song.title}`)
        .setColor('#3FC45E');
    await song_queue.text_channel.send(nowPlaying)
}

const skip_song = (message, server_queue) => {

    if(!message.member.voice.channel){
        return message.channel.send(notInVoiceEmbed)
    }

    if(!server_queue){
        const noMusicInQueue = new Discord.MessageEmbed()
            .setDescription(`${crossmark}  There is no music in the queue currently!`)
            .setColor('#D64D50');
        return message.channel.send(noMusicInQueue);
    }

    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {

    if(!message.member.voice.channel){
        return message.channel.send(notInVoiceEmbed)
    }

        server_queue.songs = [];
        server_queue.connection.dispatcher.end();
    }