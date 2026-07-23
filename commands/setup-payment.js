const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");


module.exports = {


data: new SlashCommandBuilder()

.setName("setup-payment")

.setDescription(
"Create the payment information channel"
),



async execute(interaction){



const embed =

new EmbedBuilder()

.setColor("#00FF88")

.setTitle(
"💳 Zey Store Payment Information"
)

.setDescription(`

Welcome to **Zey Store** 💙

━━━━━━━━━━━━━━━━━━

💰 **How Payment Works**

1️⃣ Select the product you want to buy

2️⃣ Open a private ticket

3️⃣ Staff will provide the official payment information

4️⃣ Send your payment proof/code in the ticket

5️⃣ Staff verifies your payment

6️⃣ Your product will be delivered


━━━━━━━━━━━━━━━━━━

🔒 **Safe Payment Rules**

✅ Always pay through official Zey Store methods

✅ Never trust random users claiming to be staff

✅ Staff will never DM you asking for payment

✅ Always keep your payment proof


━━━━━━━━━━━━━━━━━━

⚡ **Delivery**

After your payment is confirmed:

🚩 Your product will be delivered

📦 Staff will help you if there are any issues


━━━━━━━━━━━━━━━━━━

❓ Need help?

Open a ticket and our team will assist you.

`)

.setFooter({

text:
"Zey Store AI • Secure Payments"

})

.setTimestamp();



await interaction.reply({

content:
"✅ Payment channel created!",

ephemeral:true

});



await interaction.channel.send({

embeds:[
embed
]

});


}

};