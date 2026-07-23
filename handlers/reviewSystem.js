const {
EmbedBuilder
} = require("discord.js");

const config =
require("../database/config.json");



module.exports = async(interaction)=>{


if(!interaction.isModalSubmit())
return;



if(
interaction.customId !== "submit_review"
)
return;





const review =
interaction.fields.getTextInputValue(
"review_text"
);






const channel =
interaction.guild.channels.cache.get(
config.reviewsChannel
);






if(channel){


const embed =
new EmbedBuilder()

.setColor("#FFD700")

.setTitle(
"⭐ New Customer Review"
)

.setDescription(`

${interaction.user}

━━━━━━━━━━━━━━

${review}

━━━━━━━━━━━━━━

Thank you for choosing Zey Store ❤️

`)

.setTimestamp();





await channel.send({

embeds:[
embed
]

});


}





await interaction.reply({

content:
"✅ Thank you for your review!",

ephemeral:true

});



};