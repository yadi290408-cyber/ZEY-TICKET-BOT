const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");


const ordersPath = "../database/orders.json";


module.exports = {


data: new SlashCommandBuilder()

.setName("dashboard")

.setDescription("View store statistics"),



async execute(interaction){



let orders=[];


try{

orders=require(ordersPath);

}

catch{

orders=[];

}





const total =
orders.length;


const approved =
orders.filter(
o=>o.status==="Approved"
).length;



const denied =
orders.filter(
o=>o.status==="Denied"
).length;



const waiting =
orders.filter(
o=>o.status==="Waiting"
).length;






const embed =
new EmbedBuilder()

.setColor("#5865F2")

.setTitle("📊 Zey Store Dashboard")

.setDescription(`

━━━━━━━━━━━━━━

🛒 Total Orders:
**${total}**

🟢 Approved:
**${approved}**

🔴 Denied:
**${denied}**

🟡 Waiting:
**${waiting}**

━━━━━━━━━━━━━━

🤖 AI Store System Online

`)

.setFooter({

text:"Zey Store AI Dashboard"

});





await interaction.reply({

embeds:[
embed
],

ephemeral:true

});



}


};