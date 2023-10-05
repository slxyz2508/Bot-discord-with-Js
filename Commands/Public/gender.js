const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gender')
    .setDescription('tell your gender...')
    .addStringOption((option) =>
      option
      .setName('sex')
      .setDescription('your gender')
      .setRequired(true)
      .setChoices({ 
      name : 'male',
      value : 'Male',
    },
    {
      name : 'female',
      value : 'Female',
    },
    {
      name : 'transgender',
      value : 'Transgender',
    })),
    async execute(interaction) {
        const sex = interaction.options.getString('sex');
        interaction.reply(`My sex is ${sex}.`);
    },
    
};