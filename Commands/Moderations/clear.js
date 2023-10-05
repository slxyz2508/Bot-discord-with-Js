const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear text')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amounts')
                .setDescription('The number of messages to clear')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Optional: Select a target user')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.get('amounts').value;
        const target = options.get('target')?.user;

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder()
            .setColor(0x00ff44);

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from ${target}.`);
                interaction.reply({ embeds: [res] });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Successfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({ embeds: [res] });
            });
        }
    }
};