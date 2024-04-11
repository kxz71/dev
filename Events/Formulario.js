require("../index");

const Discord = require("discord.js");
const client = require("../index");
const { QuickDB } = require("quick.db")
const db = new QuickDB();

client.on("interactionCreate", async (interaction, member) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (
        !interaction.guild.channels.cache.get(
          await db.get(`canal_logs_${interaction.guild.id}`),
        )
      )
        return interaction.reply({
          content: `O sistema está desativado.`,
          ephemeral: true,
        });
      const modal = new Discord.ModalBuilder()
        .setCustomId("modal")
        .setTitle("Formulário");

      const pergunta1 = new Discord.TextInputBuilder()
        .setCustomId("pergunta1") // Coloque o ID da pergunta
        .setLabel("QUAL SEU NOME? (RP)") // Coloque a pergunta
        .setMaxLength(30) // Máximo de caracteres para a resposta
        .setPlaceholder("Nome") // Mensagem que fica antes de escrever a resposta
        .setRequired(true) // Deixar para responder obrigatório (true | false)
        .setStyle(Discord.TextInputStyle.Short); // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
        .setCustomId("pergunta2") // Coloque o ID da pergunta
        .setLabel("QUAL E SUA IDADE? (RL)") // Coloque a pergunta
        .setMaxLength(30) // Máximo de caracteres para a resposta
        .setPlaceholder("Idade") // Mensagem que fica antes de escrever a resposta
        .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
        .setRequired(true);

      const pergunta3 = new Discord.TextInputBuilder()
        .setCustomId("pergunta3") // Coloque o ID da pergunta
        .setLabel("QUAL SEU ID?") // Coloque a pergunta
        .setPlaceholder("ID") // Mensagem que fica antes de escrever a resposta
        .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
        .setRequired(true);

      const pergunta4 = new Discord.TextInputBuilder()
        .setCustomId("pergunta41") // Coloque o ID da pergunta
        .setLabel("QUAL CARGO NA FAC?") // Coloque a pergunta
        .setPlaceholder("Cargo") // Mensagem que fica antes de escrever a resposta
        .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
        .setRequired(true);

     const pergunta12 = new Discord.TextInputBuilder()
        .setCustomId("pergunta11") // Coloque o ID da pergunta
        .setLabel("QUEM RECRUTOU?") // Coloque a pergunta
        .setMaxLength(30) // Máximo de caracteres para a resposta
        .setPlaceholder("Nome do Recrutador") // Mensagem que fica antes de escrever a resposta
        .setRequired(true) // Deixar para responder obrigatório (true | false)
        .setStyle(Discord.TextInputStyle.Short); // Tipo de resposta (Short | Paragraph)

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3),
        new Discord.ActionRowBuilder().addComponents(pergunta4),
        new Discord.ActionRowBuilder().addComponents(pergunta12),
      );

      await interaction.showModal(modal);
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1");
      let resposta2 = interaction.fields.getTextInputValue("pergunta2");
      let resposta3 = interaction.fields.getTextInputValue("pergunta3");
      let resposta4 = interaction.fields.getTextInputValue("pergunta41");
      let resposta5 = interaction.fields.getTextInputValue("pergunta11");

      if (!resposta1) resposta1 = "Não informado.";
      if (!resposta2) resposta2 = "Não informado.";
      if (!resposta3) resposta3 = "Não informado.";
      if (!resposta4) resposta3 = "Não informado.";
      if (!resposta5) resposta3 = "Não informado.";


      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `**Formulário de** ${interaction.user}`,
        )
        .addFields(
          {
            name: `Nome:`,
            value: `\`\`\`${resposta1}\`\`\``,
            inline: false,
          },
          {
            name: `Idade:`,
            value: `\`\`\`${resposta2}\`\`\``,
            inline: false,
          },
          {
            name: `ID:`,
            value: `\`\`\`${resposta3}\`\`\``,
            inline: false,
          },
          {
            name: `Cargo:`,
            value: `\`\`\`${resposta4}\`\`\``,
            inline: false,
          },
          {
            name: `Recrutador:`,
            value: `\`\`\`${resposta5}\`\`\``,
            inline: false,
          },
        );

        let botao23 = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()

          .setEmoji("✅")
          .setLabel("Verificar Usuário")
          .setURL('https://discord.com')
          .setStyle(Discord.ButtonStyle.Link)
          .setDisabled(true)
      );


      const user = interaction.user;
      const membro = interaction.guild.members.cache.get(user.id)

      membro.setNickname(`${resposta1} | ${resposta3}`)


      interaction.reply({
        content: `Olá **${interaction.user.username}**, seu formulário foi enviado com sucesso!`,
        ephemeral: true,
      });
      await interaction.guild.channels.cache
        .get(await db.get(`canal_logs_${interaction.guild.id}`))
        .send({ embeds: [embed], components: [botao23] });
    }
  }
});
