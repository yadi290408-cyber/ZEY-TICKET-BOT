const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");


const ordersPath =
"./database/orders.json";



function loadOrders(){

    if(!fs.existsSync(ordersPath))
        return [];


    return JSON.parse(
        fs.readFileSync(
            ordersPath,
            "utf8"
        )
    );

}



function saveOrders(data){

    fs.writeFileSync(
        ordersPath,
        JSON.stringify(
            data,
            null,
            4
        )
    );

}




module.exports = async(interaction)=>{


    if(!interaction.isModalSubmit())
        return;



    if(
        interaction.customId !== "submit_code_modal"
    )
        return;




    console.log("CODE MODAL");



    const code =
    interaction.fields.getTextInputValue(
        "gift_code"
    );




    await interaction.deferReply({
        ephemeral:true
    });





    let orders =
    loadOrders();





    const order =
    orders.find(
        o =>
        o.ticket === interaction.channel.id
    );





    if(!order){

        return interaction.editReply({

            content:
            "❌ Order not found."

        });

    }






    order.code = code;

    order.status =
    "Reviewing";



    saveOrders(
        orders
    );






    await interaction.editReply({

        content:
        "✅ Code submitted. Staff will review your order."

    });







    // ORDERS CHANNEL

    const ordersChannelId =
    "1529646238515855539";



    const ordersChannel =
    interaction.guild.channels.cache.get(
        ordersChannelId
    );



    console.log(
        "ORDERS CHANNEL:",
        ordersChannelId
    );


    console.log(
        "FOUND CHANNEL:",
        ordersChannel?.name
    );





    if(!ordersChannel){

        console.log(
            "❌ Orders channel not found"
        );

        return;

    }









    const embed =
    new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(
        "🛒 New Order Review"
    )

    .setDescription(`

━━━━━━━━━━━━━━

👤 **Customer**

<@${order.user}>


🚩 **Product**

${order.product}


💰 **Price**

$${order.price}


🆔 **Order ID**

\`${order.id}\`


🔑 **Gift Code**

\`${code}\`

━━━━━━━━━━━━━━

📊 **Status**

🔵 Reviewing

━━━━━━━━━━━━━━

`)

    .setFooter({

        text:
        "Zey Store AI • Order System"

    })

    .setTimestamp();








    const buttons =
    new ActionRowBuilder()

    .addComponents(



        new ButtonBuilder()

        .setCustomId(
            `accept_order_${order.ticket}`
        )

        .setLabel(
            "✅ Accept Order"
        )

        .setStyle(
            ButtonStyle.Success
        ),




        new ButtonBuilder()

        .setCustomId(
            `deny_order_${order.ticket}`
        )

        .setLabel(
            "❌ Deny Order"
        )

        .setStyle(
            ButtonStyle.Danger
        )


    );








    await ordersChannel.send({

        content:
        "🔔 New order waiting for review!",


        embeds:[
            embed
        ],


        components:[
            buttons
        ]

    });



};