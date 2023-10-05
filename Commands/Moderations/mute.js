const {SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder} = require('discord.js');

const ms = require('ms')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
        option.setName('เป้าหมาย')
        .setDescription('ผู้ใช้ที่ต้องการจmute')
        .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('เวลา')
            .setDescription('เวลาที่ใช้')
            .setRequired(true))
        .addStringOption(option =>
                option.setName('เหตุผล')
                .setDescription('เหตุผลที่ mute')),
        
            async execute(interaction){
                
                const target = interaction.options.get('เป้าหมาย').value;
                const reason = interaction.options.get('เหตุผล')?.value || 'ไม่มีเหตุผล'
                const time = interaction.options.get('เวลา').value
                const convertTime = ms(time);
                const member = interaction.guild.members.cache.get(target)

                const errorembed = new EmbedBuilder()
                .setDescription('มีบางอย่างผิดพลาด. ลองใหม่อีกครั้ง')
                .setColor(0xfc3599)

                const successembed = new EmbedBuilder()
                .setTitle('// Muted //')
                .setDescription(`Succesfully muted ${target}.`)
                .addFields(
                    {name: 'เหตุผล', value: `${reason}`, inline: true},
                    {name: 'เวลา', value: `${time}`, inline: true}
                )
                .setColor(0xfc3599)
                .setTimestamp()
                
                const targetUserRolePositon= member.roles.highest.position;
                const requestUserRolePosition = interaction.member.roles.highest.position;
                
                if(targetUserRolePositon >= requestUserRolePosition){
                    await interaction.reply('คุณไม่สามารถมิวท์คนทีมียศสูงกว่าหรือเท่ากันได้')
                    return;
                }
                if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)){
                await interaction.reply({embeds: [errorembed],ephemeral: true})
                return}
                if(!convertTime){
                    await interaction.reply({embeds: [errorembed],ephemeral:true})
                    return
                }
                try {
                    await member.timeout(convertTime, reason)
                    interaction.reply({embeds:[successembed],ephemeral: true});
                } catch (error) {
                    console.log(error);
                }

            }
}