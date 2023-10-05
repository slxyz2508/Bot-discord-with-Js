const {SlashCommandBuilder} = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
  .setName('birth')
  .setDescription('tell your birthday...')
  .addStringOption((option) =>
    option
    .setName('day')
    .setDescription('username date')
    .setRequired(true))
  
  .addStringOption((option) =>
    option
      .setName('month')
      .setDescription('username month')
      .setRequired(true)
      .setChoices(
        { 
              name : 'Januray',
              value : 'January',
            },
            {
              name : 'February',
              value : 'February',
            },
            {
              name : 'March',
              value : 'March',
            },
            {
              name : 'April',
              value : 'April',
            },
            {
              name : 'May',
              value : 'May',
            },
            {
              name : 'June',
              value : 'June',
            },
            {
              name : 'July',
              value : 'July',
            },
            {
              name : 'August',
              value : 'August',
            },
            {
              name : 'September',
              value : 'September',
            },
            {
              name : 'October',
              value : 'October',
            },
            {
              name : 'November',
              value : 'Novermber',
            },
            {
              name : 'December',
              value : 'December',
            })),
    async execute(interaction) {
        const day = interaction.options.getString('day');
        const month = interaction.options.getString('month');
        interaction.reply(`My brithday is on ${day} ${month}.`);
    },

};