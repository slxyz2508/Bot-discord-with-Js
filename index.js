const {Client,IntentsBitField,Collection} = require('discord.js');
const {loadEvents} = require('./Handlers/eventsHandler');
const {loadCommands} =require('./Handlers/commandHandler')
const {DisTube} = require("distube")
const { YtDlpPlugin } = require('@distube/yt-dlp');
const client = new Client({ intents : [
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates

],
 });


client.distube = new DisTube(client,{
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [
        new YtDlpPlugin()]
})
module.exports = client;
client.commands = new Collection()

client.config = require('./config.json')
client.login(client.config.token).then(()=> {
    loadEvents(client);
    loadCommands(client);
});
module.exports = client