const{ SlashCommandBuilder,EmbedBuilder,PermissionFlagsBits} = require('discord.js')
module.exports = { 
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('unban a user')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => 
        option.setName('ไอดีผู้ใช้')
        .setDescription('ไอดีผู้ใช้ที่ต้องการจะปลด')
        .setRequired(true)),
    async execute(interaction){
        const userId = interaction
        .options.get('ไอดีผู้ใช้').value;
        try {
            await interaction.guild.members.unban(userId)
            const Embed = new EmbedBuilder()
            .setDescription(`SuccesFully unban id${userId}`)
            .setColor(0xf54254)
            .setTimestamp()
            await interaction.reply({
                embeds: [Embed]
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}