const {SlashCommandBuilder, CommandInteraction} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('krit')
    .setDescription('ทักทายกิต'),
    execute(interaction){
        interaction.reply({content: "เรื้อน", ephermal: true})  //ephermal : true คือเห็นข้อความนี้แค่เราคนเดียว

    }
}