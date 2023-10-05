const {EmbedBuilder,SlashCommandBuilder,PermissionFlagsBits,VoiceChannel,GuildEmoji} = require('discord.js')
const client = require('../../index')

module.exports = {
    data: new SlashCommandBuilder()
          .setName('music')
          .setDescription('Complete music system')
          .addSubcommand(subcommand =>
            subcommand
            .setName('play')
            .setDescription('Play a song')
            .addStringOption(option =>
                option
                .setName('query')
                .setDescription('Provide the name or url for the song')
                .setRequired(true)))

            .addSubcommand(subcommand =>
                    subcommand
                    .setName('volume')
                    .setDescription('Adjust the song volume')
                    .addIntegerOption(option =>
                        option
                        .setName('percent')
                        .setDescription('10 = 10%')
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setRequired(true)))

            .addSubcommand(subcommand =>
                            subcommand
                            .setName('options')
                            .setDescription('select an options')
                            .addStringOption(option =>
                                option
                                .setName('options')
                                .setDescription('Select an option.')
                                .setRequired(true)
                                .addChoices(
                                    {name: "queue", value: "queue"},
                                    {name: "skip", value: "skip"},
                                    {name: "pause", value: "pause"},
                                    {name: "resume", value: "resume"},
                                    {name: "stop", value: "stop"},
                                ))),
                                async execute(interaction){
                                    const subcommand = interaction.options.getSubcommand();
                                    const query = interaction.options.getString('query')
                                    const volume = interaction.options.get('percent')?.value;
                                    const option = interaction.options.getString('options');
                                    const VoiceChannel = interaction.member.voice.channel;
                                    
                                    
                                    const embed = new EmbedBuilder()
                                    if(!VoiceChannel){
                                        embed.setColor('Red').setDescription('You must be in a voice channel to use this command')
                                        return interaction.reply({embeds : [embed], ephemeral:true})
                                    }
                                    if(!interaction.member.voice.channelId === interaction.guild.members.me.voice.channelId){
                                        embed.setColor('Red').setDescription(`You cant use the music player as it is already active in<#${interaction.guild.members.me.voice.channelId}`)
                                        return interaction.reply({embeds: [embed], ephemeral:true});
                                        
                                    }
                                    try {
                                        switch(subcommand){
                                            case 'play':
                                            client.distube.play(VoiceChannel,query,{textChannel: interaction.channel, member:interaction.member});
                                            return interaction.reply({content : "Request received."});
                                            case 'volume':
                                            client.distube.setVolume(VoiceChannel,volume);
                                            return interaction.reply({content : `Volume has been set to ${volume}%.`});
                                            case 'options':
                                            const queue = await client.distube.getQueue(VoiceChannel);
                                            if(!queue){
                                                embed.setColor('Red').setDescription('There is no active queue');
                                                return interaction.reply({embeds: [embed], ephemeral:true});
                                            }

                                            switch (option){
                                                case "skip":
                                                    await queue.skip(VoiceChannel);
                                                    embed.setColor("Green").setDescription('The song has been skip')
                                                    return interaction.reply({embeds: [embed], ephemeral:true});
                                                case "stop":
                                                    await queue.stop(VoiceChannel);
                                                    embed.setColor("Green").setDescription('The queue has been stop')
                                                    return interaction.reply({embeds: [embed], ephemeral:true});
                                                case "pause":
                                                    await queue.pause(VoiceChannel);
                                                    embed.setColor("Orange").setDescription('The song has been pause')
                                                    return interaction.reply({embeds: [embed], ephemeral:true});
                                                case "resume":
                                                    await queue.resume(VoiceChannel);
                                                    embed.setColor("Green").setDescription('The song has been resumed')
                                                    return interaction.reply({embeds: [embed], ephemeral:true});
                                                case "queue":
                                                    embed.setColor('Purple').setDescription(`${queue.songs.map(
                                                        (song,id) => `\n**${id + 1}. **${song.name} -\`${song.formattedDuration}\``
                                                    )}`);
                                                    return interaction.reply({embeds: [embed], ephemeral:true});
                                            }
                                            
                                        }
                                        
                                    } 
                                    catch (error) 
                                    {console.log(error);
                                        embed.setColor("Red").setDescription('Something went wrong...')

                                        return interaction.reply({embeds:[embed],ephemeral:true});
                                    }
                                }
}