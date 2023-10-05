const {ActionRowBuilder,ModalBuilder,TextInputBuilder,TextInputStyle,SlashCommandBuilder} = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("movieforum")
      .setDescription("ask your favorite movie"),
     async execute(interaction)  {
      const modal = new ModalBuilder()
        .setCustomId(`modal-${interaction.user.id}`)
        .setTitle("Reminder");
  
      const movies = new TextInputBuilder()
        .setCustomId("movievalue")
        .setLabel("หนังเรื่องโปรดของคุณคือ?")
        .setStyle(TextInputStyle.Short);
  
      const reason = new TextInputBuilder()
        .setCustomId("reasonvalue")
        .setLabel("เหตุผล")
        .setStyle(TextInputStyle.Paragraph);
  
      const row1 = new ActionRowBuilder().addComponents(movies);
      const row2 = new ActionRowBuilder().addComponents(reason);
  
      modal.addComponents(row1, row2);
  
      await interaction.showModal(modal);
  
      const filter = (interaction) =>
        interaction.customId === `modal-${interaction.user.id}`;
  
      interaction
        .awaitModalSubmit({ filter, time: 30_000 })
        .then((modalInteraction) => {
          const movieValue =
            modalInteraction.fields.getTextInputValue("movievalue");
          const reasonValue =
            modalInteraction.fields.getTextInputValue("reasonvalue");
  
          modalInteraction.reply(`หนังเรื่องโปรดของคุณคือ ${movieValue} เพราะว่า ${reasonValue}`);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    },
  };