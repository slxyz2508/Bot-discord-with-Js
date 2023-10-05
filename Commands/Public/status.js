const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update the bot presence')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName('activity')
                .setDescription('Update the bot activity')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Pick an activity')
                        .setRequired(true)
                        .addChoices(
                            { name: "Playing", value: "Playing" },
                            { name: "Streaming", value: "Streaming" },
                            { name: "Listening", value: "Listening" },
                            { name: "Watching", value: "Watching" },
                            { name: "Competing", value: "Competing" }
                        ))
                .addStringOption(option =>
                    option.setName('name') 
                        .setDescription('Activity name')
                        .setRequired(true))) 
        .addSubcommand(subcommand =>
            subcommand.setName('status')
                .setDescription('Update the bot Status')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Pick a status')
                        .setRequired(true)
                        .addChoices(
                            { name: "Online", value: "online" },
                            { name: "Idle", value: "idle" },
                            { name: "Do not disturb", value: "dnd" },
                            { name: "Invisible", value: "invisible" }
                        ))
        ),
    async execute(interaction,client) { 
        const sub = interaction.options.getSubcommand();
        const type = interaction.options.getString('type'); 

        try {
            switch (sub) {
                case 'activity':
                    const activityName = interaction.options.getString('name'); 
                    let activityType;

                    switch (type) {
                        case 'Playing':
                            activityType = ActivityType.Playing;
                            break;
                        case 'Watching':
                            activityType = ActivityType.Watching;
                            break;
                        case 'Streaming':
                            activityType = ActivityType.Streaming;
                            break;
                        case 'Listening':
                            activityType = ActivityType.Listening;
                            break;
                        case 'Competing':
                            activityType = ActivityType.Competing;
                            break;
                        default:
                            return interaction.reply('Invalid activity type.');
                    }

                    client.user.setActivity(activityName, { type: activityType });
                    break;

                case 'status':
                    client.user.setPresence({ status: type });
                    break;

                default:
                    return interaction.reply('Invalid subcommand.');
            }
        } catch (error) {
            console.error(error);
        }

        const embed = new EmbedBuilder()
            .setDescription(`Set ${sub} to ${type} successfully.`);

        return interaction.reply({ embeds: [embed] });
    }
};