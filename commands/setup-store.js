const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const products = require("../database/products.json");


module.exports = {

data: new SlashCommandBuilder()

.setName("setup-store")

.setDescription(
"Create the Zey Store purchase panel"
),



async execute(interaction){



const embed =
new EmbedBuilder()

.setColor("#5865F2")

.setTitle(
"🚩 Zey Store | AI Purchase Center"
)

.setThumbnail(
interaction.client.user.displayAvatarURL({
dynamic:true
})
)

.setDescription(`

# 🤖 Welcome to Zey Store

Your premium Roblox digital store.


━━━━━━━━━━━━━━━━━━

🛒 **How to order**

1️⃣ Select your product below  
2️⃣ Create your private ticket  
3️⃣ Submit payment code  
4️⃣ Receive your product


━━━━━━━━━━━━━━━━━━


🚩 **Available Products**

${products.map(product =>
`${product.emoji} **${product.name}** — $${product.price}`
).join("\n")}


━━━━━━━━━━━━━━━━━━


⚡ Fast Delivery  
🔒 Secure Orders  
🤖 AI Support 24/7


Thank you for choosing **Zey Store** ❤️

`)



.setImage(

"https://cdn.discordapp.com/attachments/824554288202121236/1529684192609173564/banner.png?ex=6a62d4eb&is=6a61836b&hm=c23dcda898ba103b2620f1270ac7897788f4ca4884bfc1b1c681b78d21ca22b5"

)



.setFooter({

text:
"Zey Store AI • Premium Service"

})


.setTimestamp();





const menu =

new StringSelectMenuBuilder()

.setCustomId(
"flag_select"
)

.setPlaceholder(
"🚩 Select your product"
)

.addOptions(

products.map(product => ({

label:
product.name,

description:
`Purchase ${product.name} for $${product.price}`,

value:
product.id,

emoji:
product.emoji

}))

);





const row =

new ActionRowBuilder()

.addComponents(
menu
);






await interaction.reply({

content:
"✅ Store panel created!",

ephemeral:true

});






await interaction.channel.send({

embeds:[
embed
],

components:[
row
]

});



}

};