const {EmbedBuilder,SlashCommandBuilder} = require('discord.js')
module.exports ={
   data: new SlashCommandBuilder()
   .setName('server')
   .setDescription('Get infomation on the server'),
    
   async execute(interaction) {
       if (!interaction.inGuild()) {
           interaction.reply({
               content: 'You can only run this command insider a server',
               ephrmeral:true,
           });
           return;
       }
       

       const embed = new EmbedBuilder({
           author: {name:  interaction.guild.name, iconURL:  interaction.guild.iconURL({ size: 256})},
           color: 0x0099ff,
           title: 'Server',
           fields: [
               {name: 'Owner', value: (await  interaction.guild.fetchOwner()).user.username, inline: true},
               {name: 'Text Channels', value:  interaction.guild.channels.cache.filter((c)=> c.type === 0).toJSON().length, inline: true},
               {name: 'Voice Channels', value:  interaction.guild.channels.cache.filter((c)=> c.type === 2).toJSON().length, inline: true},
               {name: 'Member', value:  interaction.guild.memberCount, inline: true},
               {name: 'Roles', value:  interaction.guild.roles.cache.size,inline: true},
               {name: 'Role List', value:  interaction.guild.roles.cache.toJSON().join(',')},
           ],
           thumbnail: {
            url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/C029/production/_94639194_c8963a76-4f32-4f8d-8287-ef0ace9dd661.jpg',
        },
           footer: {text: `ID: ${ interaction.guild.id } | Server Created: ${interaction.guild.createdAt.toDateString()}`},
        
       });
       interaction.reply({embeds: [embed]});
   },
}