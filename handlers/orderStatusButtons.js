const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");
const products = require("../database/products.json");


const ordersPath = "./database/orders.json";



function loadOrders(){

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


    if(!interaction.isButton())
        return;



    if(
        !interaction.customId.startsWith("accept_order_")
    )
        return;






    await interaction.deferReply({
        ephemeral:true
    });






    const ticketId =
    interaction.customId.replace(
        "accept_order_",
        ""
    );






    let orders =
    loadOrders();






    const order =
    orders.find(
        o =>
        o.ticket === ticketId
    );






    if(!order){

        return interaction.editReply(
            "❌ Order not found."
        );

    }







    order.status =
    "Approved";



    saveOrders(
        orders
    );








    const product =
    products.find(
        p =>
        p.name === order.product
    );








    const embed =
    new EmbedBuilder()

    .setColor("#00FF88")

    .setTitle(
        "✅ Order Approved"
    )

    .setDescription(`

🎉 Your order has been approved!

━━━━━━━━━━━━━━

🆔 Order ID:
\`${order.id}\`

🚩 Product:
${order.product}

💰 Price:
$${order.price}

━━━━━━━━━━━━━━

✅ Payment verified.

The Zey Store owner will now deliver your product.

Thank you for choosing Zey Store ❤️

`);









    const buttons =

    new ActionRowBuilder()

    .addComponents(



        new ButtonBuilder()

        .setCustomId(
            "leave_review"
        )

        .setLabel(
            "⭐ Leave Review"
        )

        .setStyle(
            ButtonStyle.Primary
        ),





        new ButtonBuilder()

        .setLabel(
            "🔗 G2A Payment Link"
        )

        .setStyle(
            ButtonStyle.Link
        )

        .setURL(
            product?.g2a || "https://g2a.com"
        )



    );








    try{


        const ticket =
        await interaction.guild.channels.fetch(
            order.ticket
        );





        await ticket.send({

            content:
            `<@${order.user}>`,

            embeds:[
                embed
            ],

            components:[
                buttons
            ]

        });



    }catch(error){

        console.log(
            "Ticket send error:",
            error
        );

    }






    await interaction.editReply(

        "✅ Order approved successfully."

    );



};