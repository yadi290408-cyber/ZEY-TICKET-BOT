const {
SlashCommandBuilder,
EmbedBuilder
}=require("discord.js");


module.exports={


data:new SlashCommandBuilder()

.setName("setup-rules")

.setDescription(
"Create server rules channel"
),



async execute(interaction){


const embed =

new EmbedBuilder()

.setColor("#FF0000")

.setTitle(
"📜 Zey Store Server Rules"
)

.setDescription(`

━━━━━━━━━━━━━━━━━━

1️⃣ **Be respectful**

Treat everyone with respect.

2️⃣ **Follow Discord Terms of Service**

Breaking Discord ToS means you are responsible.

3️⃣ **No accusations without proof**

Calling us scammers without proof is not allowed.

Screenshots or proof are required.

4️⃣ **No spam pinging**

Staff are humans. Please be patient.

5️⃣ **No self promotion**

No advertising or random invites.

6️⃣ **Do not abuse staff permissions**

Abusing staff systems will result in punishment.

7️⃣ **No fake tickets**

Do not open tickets just to waste staff time.

8️⃣ **No suspicious links/files**

Do not send unknown files, links or downloads.

9️⃣ **No refunds after purchase**

All sales are final.

🔟 **Payment proof required**

You pay ➜ you receive.

━━━━━━━━━━━━━━━━━━

🚫 **Instant Ban Offenses**

❌ Impersonating staff

❌ Sending flags/products

❌ Troll tickets

❌ Scamming attempts

❌ Fake payment proofs

❌ Trying to bypass rules

❌ Sharing private staff information

━━━━━━━━━━━━━━━━━━

⚠️ **Ticket Rules**

• Do not troll in tickets

• Do not spam staff

• Explain your issue clearly

• Be patient while waiting

━━━━━━━━━━━━━━━━━━

💙 Respect the community.

We are here to buy, sell and chill.

`)

.setFooter({

text:
"Zey Store Rules"

})

.setTimestamp();



await interaction.reply({

content:
"✅ Rules channel created!",

ephemeral:true

});


await interaction.channel.send({

embeds:[
embed
]

});


}

};