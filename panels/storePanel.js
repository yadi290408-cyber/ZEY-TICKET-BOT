const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const products = require("../database/products.json");


module.exports = async (channel) => {


    console.log("Creating store panel...");


    const embed = new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle("🚩 Zey Store | AI Purchase Center")

    .setDescription(`

🤖 Welcome to **Zey Store**

Choose a product below to open your private order ticket.

━━━━━━━━━━━━━━

🚩 Available Flags:

${products.map(
p => `${p.emoji} **${p.name}** - $${p.price}`
).join("\n")}

━━━━━━━━━━━━━━

Select your product 👇

`)

    .setFooter({
        text:"Zey Store AI • Premium Service"
    });





    const menu = new StringSelectMenuBuilder()

    .setCustomId("flag_select")

    .setPlaceholder("🚩 Select a flag")

    .addOptions(

        products.map(product => ({

            label: product.name,

            description:
            `$${product.price} USD`,

            value:
            product.id,

            emoji:
            product.emoji

        }))

    );





    const row =
    new ActionRowBuilder()

    .addComponents(menu);





    await channel.send({

        embeds:[
            embed
        ],

        components:[
            row
        ]

    });


    console.log("Store panel sent!");

};