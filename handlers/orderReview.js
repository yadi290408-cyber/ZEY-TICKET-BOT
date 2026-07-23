const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = async function(channel, order){


    const embed = new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle("🛒 New Order")

    .setDescription(`

A new order has arrived.

━━━━━━━━━━━━━━

🆔 Order ID:
\`${order.id}\`

👤 Customer:
<@${order.user}>

🚩 Product:
${order.product}

💰 Price:
$${order.price}

🔑 Code:
\`${order.code}\`

━━━━━━━━━━━━━━

Approve or deny this order.

`);





const row = new ActionRowBuilder()

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





await channel.send({

embeds:[
embed
],

components:[
row
]

});


};