const {Client,SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('unMute a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
        option.setName('เป้าหมาย')
        .setDescription('ผู้ใช้ที่ต้องการจะเตะ')
        .setRequired(true)
        ),
    async execute(interaction){
        
        const target = interaction.options.get('เป้าหมาย').value;
        const member = interaction.guild.members.cache.get(target)

        const errorembed = new EmbedBuilder()
            .setDescription('มีบางอย่างผิดพลาด. ลองใหม่อีกครั้ง')
            .setColor(0xfc3599)

        const successembed = new EmbedBuilder()
            .setTitle(':white_check_mark: Umuted')
            .setDescription(`Succesfully unmuted ${target}.`)
            .setColor(0xfc3599)
            .setTimestamp()

            const targetUserRolePositon= member.roles.highest.position;
            const requestUserRolePosition = interaction.member.roles.highest.position;
            
            if(targetUserRolePositon >= requestUserRolePosition){
                await interaction.reply('คุณไม่สามารถเตะคนทีมียศสูงกว่าหรือเท่ากันได้')
                return;
            }
            if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)){
            await interaction.reply({embeds: [errorembed],ephemeral: true})
            return}
            try {
                await member.timeout(null)
                interaction.reply({embeds:[successembed],ephemeral: true});
            } catch (error) {
                console.log(error);
            }

                
        
    }
}