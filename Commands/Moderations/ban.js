const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
     .setName('ban')
     .setDescription('Bans a member form the server')
     .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
     .addUserOption(option =>
        option.setName('เป้าหมาย')
        .setDescription('ผู้ใช้ที่ต้องการจะแบน')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('เหตุผล')
        .setDescription('เหตุผลที่แบน')),

     async execute ( interaction) {
        const targetUserId =  interaction.options.get('เป้าหมาย').value;
        const reason = interaction.options.get('เหตุผล')?.value || 'ไม่มีเหตุผล';
        const targetUser = await interaction.guild.members.fetch(targetUserId)
        if(!targetUser){
            await interaction.editReply('ไม่มีบุคคลนั้นในเซิฟเวอร์นี้')
            return;
        }
        if(targetUser.id === interaction.guild.ownerId){
            await interaction.editReply('คุณไม่สามารถแบนได้นั้นคือเจ้าของเซิฟ')
            return;
        }
        const targetUserRolePositon= targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if(targetUserRolePositon >= requestUserRolePosition){
            await interaction.editReply('คุณไม่สามารถแบนคนทีมียศสูงกว่าหรือเท่ากันได้')
            return;
        }
        if (targetUserRolePositon >= botRolePosition){
            await interaction.editReply('ฉันไม่สามารถแบนคนทีมียศสูงกว่าหรือเท่ากันได้')
            return;
        }
        try {
            await targetUser.ban({ reason })
            await interaction.reply(`ผู้ใช้ ${targetUser} ถูกแบน\nถูกแบนด้วยเหตุผล ${reason}`)
        } catch (error) {
            console.log(`มีปัญหาเพราะ ${error}`);
            
        }
    },
};