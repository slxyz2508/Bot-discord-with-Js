const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subtract')
        .setDescription('substract two numbers')
        .addIntegerOption((option) =>
            option
                .setName('first-number')
                .setDescription('Enter the first number')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('second-number')
                .setDescription('Enter the second number')
                .setRequired(true)
        ),
    execute(interaction) {
        const num1 = interaction.options.getInteger('first-number');
        const num2 = interaction.options.getInteger('second-number');
        interaction.reply(`The sum is ${num1 - num2}.`);
    },
};