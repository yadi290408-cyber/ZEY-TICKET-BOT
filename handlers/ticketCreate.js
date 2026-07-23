const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");



async function createTicket(interaction){


    const guild = interaction.guild;



    const ticketCategory =
    process.env.TICKET_CATEGORY;



    const staffRole =
    process.env.STAFF_ROLE;




    const channel =
    await guild.channels.create({

        name:`order-${interaction.user.username}`,

        type:ChannelType.GuildText,

        parent:ticketCategory,

        permissionOverwrites:[


            {
                id:guild.id,

                deny:[
                    PermissionFlagsBits.ViewChannel
                ]

            },


            {
                id:interaction.user.id,

                allow:[

                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages

                ]

            },


            {
                id:staffRole,

                allow:[

                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages

                ]

            }


        ]

    });






    const orderNumber =
    "ZS-" + Math.floor(
        100000 + Math.random()*900000
    );






    const embed =
    new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(
        "🚩 ZEY STORE ORDER"
    )

    .setDescription(`

Welcome to **Zey Store**.

━━━━━━━━━━━━━━

👤 Customer:
${interaction.user}

🆔 Order ID:
\`${orderNumber}\`

📊 Status:
🟡 Waiting

━━━━━━━━━━━━━━

Please select your product and submit your payment code.

    `)

    .setFooter({

        text:
        "Zey Store AI • Premium Service"

    })

    .setTimestamp();







    const buttons =
    new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()

        .setCustomId(
            "claim_order"
        )

        .setLabel(
            "👤 Claim Order"
        )

        .setStyle(
            ButtonStyle.Primary
        ),



        new ButtonBuilder()

        .setCustomId(
            "close_ticket"
        )

        .setLabel(
            "🔒 Close Ticket"
        )

        .setStyle(
            ButtonStyle.Danger
        )

    );







    await channel.send({

        content:
        `${interaction.user}`,

        embeds:[
            embed
        ],

        components:[
            buttons
        ]

    });







    await interaction.reply({

        content:
        `✅ Ticket created: ${channel}`,

        ephemeral:true

    });



}




module.exports = {

    createTicket

};