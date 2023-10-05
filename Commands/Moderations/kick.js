const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
module.exports = {
     data: new SlashCommandBuilder()
     .setName('kick')
     .setDescription('kick a member form the server')
     .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
     .addUserOption(option =>
        option.setName('เป้าหมาย')
        .setDescription('ผู้ใช้ที่ต้องการจะเตะ')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('เหตุผล')
        .setDescription('เหตุผลที่เตะ')),
        
    async execute ( interaction)  {
        const targetUserId = interaction.options.get('เป้าหมาย').value;
        const reason = interaction.options.get('เหตุผล')?.value || 'ไม่มีเหตุผล'
        const targetUser = await interaction.guild.members.fetch(targetUserId)

        if(!targetUser){
            await interaction.reply('ไม่มีบุคคลนั้นในเซิฟเวอร์นี้')
            return;
        }
        if(targetUser.id === interaction.guild.ownerId){
            await interaction.reply('คุณไม่สามารถเตะได้นั้นคือเจ้าของเซิฟ')
            return;
        }
        const targetUserRolePositon= targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if(targetUserRolePositon >= requestUserRolePosition){
            await interaction.reply('คุณไม่สามารถเตะคนทีมียศสูงกว่าหรือเท่ากันได้')
            return;
        }
        if (targetUserRolePositon >= botRolePosition){
            await interaction.reply('ฉันไม่สามารถเตะคนทีมียศสูงกว่าหรือเท่ากันได้')
            return;
        }
        try {
            await targetUser.kick({ reason })
            await interaction.reply(`ผู้ใช้ ${targetUser} ถูกเตะ\nถูกเตะด้วยเหตุผล ${reason}`)
        } catch (error) {
            console.log(`มีปัญหาเพราะ ${error}`);
            
        }
    },
};