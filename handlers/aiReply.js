const {
    EmbedBuilder
} = require("discord.js");

const products = require("../database/products.json");
const config = {
    token: process.env.TOKEN
};


module.exports = async(message)=>{


    if(!message) return;


    // Ignore bots

    if(message.author?.bot) return;



    // Only work inside tickets

    if(
        !message.channel.name ||
        !message.channel.name.startsWith("order-")
    ){

        return;

    }




    const text =
    message.content.toLowerCase();




    let reply = null;



    // PRODUCTS


    if(
        text.includes("flag") ||
        text.includes("flags") ||
        text.includes("products")
    ){


        reply = `

🚩 **Available Zey Store Flags**

${products.map(
p=>`${p.emoji} **${p.name}** - $${p.price}`
).join("\n")}


If you want to buy one, select your product from the store panel.

`;

    }






    // PRICE


    if(
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("how much")
    ){


        reply = `

💰 **Our prices**

${products.map(
p=>`${p.emoji} ${p.name}: $${p.price}`
).join("\n")}

`;

    }





    // BUY


    if(
        text.includes("buy") ||
        text.includes("purchase") ||
        text.includes("how")
    ){


        reply = `

🛒 **How to purchase**

1. Select your flag
2. Open a ticket
3. Purchase the gift card
4. Press **Submit Code**
5. Wait for staff verification


Our team will help you through the process.

`;

    }







    // DELIVERY


    if(
        text.includes("time") ||
        text.includes("fast") ||
        text.includes("delivery")
    ){


        reply = `

⏱️ **Delivery**

Orders are reviewed as quickly as possible.

Most orders are handled shortly after verification.

`;

    }






    // SUPPORT


    if(
        text.includes("help") ||
        text.includes("support")
    ){


        reply = `

🤖 **Zey Store AI Support**

I can help with:

🚩 Products
💰 Prices
🛒 Buying
⏱️ Delivery
📌 Order questions

`;

    }







    if(!reply) return;






    const embed =
    new EmbedBuilder()

    .setColor("#5865F2")

    .setTitle(
        "🤖 Zey Store AI Assistant"
    )

    .setDescription(reply)

    .setFooter({

        text:
        config.footer

    });





    await message.reply({

        embeds:[
            embed
        ]

    });




};