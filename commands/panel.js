const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Create the Zey Store purchase panel"),


    async execute(interaction) {


        await interaction.deferReply({
            ephemeral: true
        });


        const embed = new EmbedBuilder()

            .setColor("#5865F2")

            .setTitle("🚩 Zey Store | Premium Flag Shop")

            .setDescription(`
Welcome to **Zey Store** 🤖

Our AI Purchase System will help you buy your favorite flags safely and quickly.

━━━━━━━━━━━━━━━━━━

🚩 **Available Flags**

💎 OP Flag
⭐ Elite Flag
🔥 Personal Flag
👑 Secret Flag
🌑 Phantom Flag

━━━━━━━━━━━━━━━━━━

🛒 Select a flag below to start your order.

Our system will automatically create a private ticket for you.
            `)

            .setFooter({
                text: "Zey Store AI • Premium Service"
            })

            .setTimestamp();



        const selectMenu = new StringSelectMenuBuilder()

            .setCustomId("flag_select")

            .setPlaceholder("🚩 Choose your flag")

            .addOptions([

                {
                    label:"OP Flag",
                    description:"Premium football flag",
                    value:"op_flag",
                    emoji:"💎"
                },

                {
                    label:"Elite Flag",
                    description:"Elite level flag",
                    value:"elite_flag",
                    emoji:"⭐"
                },

                {
                    label:"Personal Flag",
                    description:"Custom personal flag",
                    value:"personal_flag",
                    emoji:"🔥"
                },

                {
                    label:"Secret Flag",
                    description:"Secret premium flag",
                    value:"secret_flag",
                    emoji:"👑"
                },

                {
                    label:"Phantom Flag",
                    description:"Ultra rare flag",
                    value:"phantom_flag",
                    emoji:"🌑"
                }

            ]);



        const row1 = new ActionRowBuilder()
            .addComponents(selectMenu);



        const row2 = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId("faq_button")

                    .setLabel("❓ FAQ")

                    .setStyle(ButtonStyle.Secondary),


                new ButtonBuilder()

                    .setCustomId("support_button")

                    .setLabel("💬 Support")

                    .setStyle(ButtonStyle.Primary)

            );



        await interaction.channel.send({

            embeds:[
                embed
            ],

            components:[
                row1,
                row2
            ]

        });



        await interaction.editReply({

            content:
            "✅ Premium store panel created!"

        });


    }

};