const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('introduce')
    .setDescription('tell ur name....')
    .addStringOption((option) => 
    option
    .setName('name')
    .setDescription('username')
    .setRequired(true)),
    execute(interaction)  {
        const name = interaction.options.getString('name');
        interaction.reply(`Hi my name is ${name}.` );
    },

};