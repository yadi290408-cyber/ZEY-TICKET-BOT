const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");

const products = require("../database/products.json");


const ordersPath =
"./database/orders.json";



const ticketCategory =
process.env.TICKET_CATEGORY;


const staffRole =
process.env.STAFF_ROLE;




function saveOrder(order){

    let orders = [];

    if(fs.existsSync(ordersPath)){

        orders =
        JSON.parse(
            fs.readFileSync(
                ordersPath,
                "utf8"
            )
        );

    }


    orders.push(order);


    fs.writeFileSync(
        ordersPath,
        JSON.stringify(
            orders,
            null,
            4
        )
    );

}




module.exports = async(interaction)=>{


    if(!interaction.isStringSelectMenu())
        return;


    if(
        interaction.customId !== "flag_select"
    )
        return;



    await interaction.deferReply({
        ephemeral:true
    });





    const product =
    products.find(
        p =>
        p.id === interaction.values[0]
    );





    if(!product){

        return interaction.editReply(
            "❌ Product not found."
        );

    }






    const existing =
    interaction.guild.channels.cache.find(
        c =>
        c.name ===
        `order-${interaction.user.username}`
    );





    if(existing){

        return interaction.editReply(
            `❌ You already have a ticket: ${existing}`
        );

    }







    const ticket =
    await interaction.guild.channels.create({

        name:
        `order-${interaction.user.username}`,

        type:
        ChannelType.GuildText,


        parent:
        ticketCategory,



        permissionOverwrites:[

            {
                id:
                interaction.guild.id,

                deny:[
                    PermissionFlagsBits.ViewChannel
                ]

            },


            {
                id:
                interaction.user.id,

                allow:[
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages
                ]

            },


            {
                id:
                staffRole,

                allow:[
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.SendMessages
                ]

            }

        ]

    });








    const orderId =
    "ZS-" +
    Math.floor(
        100000 +
        Math.random()*900000
    );






    saveOrder({

        id:
        orderId,


        user:
        interaction.user.id,


        product:
        product.name,


        price:
        product.price,


        ticket:
        ticket.id,


        status:
        "Waiting"

    });









    const embed =
    new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(
        "🚩 Zey Store Order"
    )

    .setDescription(`

Welcome ${interaction.user}

━━━━━━━━━━━━━━

🚩 **Product**
${product.emoji} ${product.name}

💰 **Price**
$${product.price} USD

🆔 **Order ID**
\`${orderId}\`

━━━━━━━━━━━━━━

💳 Click the G2A button below to purchase.

After payment, press **Submit Code** and send your gift card code.

━━━━━━━━━━━━━━

Zey Store AI • Premium Service

`);



    const buttons =
    new ActionRowBuilder()

    .addComponents(

        new ButtonBuilder()

        .setLabel(
            "💳 Buy on G2A"
        )

        .setStyle(
            ButtonStyle.Link
        )

        .setURL(
            product.g2a
        ),



        new ButtonBuilder()

        .setCustomId(
            "submit_code"
        )

        .setLabel(
            "🔑 Submit Code"
        )

        .setStyle(
            ButtonStyle.Primary
        ),



        new ButtonBuilder()

        .setCustomId(
            "claim_order"
        )

        .setLabel(
            "👤 Claim Order"
        )

        .setStyle(
            ButtonStyle.Secondary
        ),



        new ButtonBuilder()

        .setCustomId(
            "close_ticket"
        )

        .setLabel(
            "🔒 Close"
        )

        .setStyle(
            ButtonStyle.Danger
        )

    );







    await ticket.send({

        content:
        `<@${interaction.user.id}> <@&${staffRole}>`,

        embeds:[
            embed
        ],

        components:[
            buttons
        ]

    });








    await interaction.editReply({

        content:
        `✅ Ticket created: ${ticket}`

    });



};