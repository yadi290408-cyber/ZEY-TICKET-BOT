const {
    EmbedBuilder
} = require("discord.js");

const colors = require("./colors");

module.exports = {

storeEmbed(){

return new EmbedBuilder()
.setColor(colors.primary)
.setTitle("🚩 Zey Store | Flag Marketplace")
.setDescription(
`
Welcome to **Zey Store**.

🤖 Our AI assistant will help you through your order.

━━━━━━━━━━━━━━

🚩 Choose your flag inside the ticket.

💳 Secure ordering
⚡ Fast delivery
🔒 Safe verification

━━━━━━━━━━━━━━

Click the button below to start your order.
`
)
.setFooter({
text:"Zey Store • Premium Flag Service"
})
.setTimestamp();

}

};