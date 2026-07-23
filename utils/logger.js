const {
EmbedBuilder
}=require("discord.js");


const config =
require("../database/config.json");



module.exports.sendLog =
async(channel,title,text)=>{


if(!channel) return;



const embed =
new EmbedBuilder()

.setColor("#5865F2")

.setTitle(title)

.setDescription(text)

.setTimestamp()

.setFooter({

text:
config.footer

});



await channel.send({

embeds:[
embed
]

});



};