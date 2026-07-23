const {
    EmbedBuilder
} = require("discord.js");

const config = {
    token: process.env.TOKEN
};


module.exports = async(interaction)=>{


    if(!interaction.isModalSubmit())
        return;


    if(interaction.customId !== "submit_review")
        return;



    const channel =
    await interaction.guild.channels.fetch(
        config.reviewsChannel
    );



    const embed =
    new EmbedBuilder()

    .setColor("#FFD700")

    .setTitle(
        "⭐ New Zey Store Review"
    )

    .setThumbnail(
        interaction.user.displayAvatarURL({
            dynamic:true,
            size:1024
        })
    )

    .setDescription(`

👤 **Discord User**
${interaction.user}


🆔 **User ID**
\`${interaction.user.id}\`


🛒 **Product**
${interaction.fields.getTextInputValue(
    "review_product"
)}


⭐ **Service**
${interaction.fields.getTextInputValue(
    "review_service"
)}


👍 **Would Recommend**
${interaction.fields.getTextInputValue(
    "review_recommend"
)}


💬 **Review**

${interaction.fields.getTextInputValue(
    "review_message"
)}

`)


    .setFooter({

        text:
        `Review from ${interaction.user.username}`,

        iconURL:
        interaction.user.displayAvatarURL({
            dynamic:true
        })

    })


    .setTimestamp();




    await channel.send({

        embeds:[
            embed
        ]

    });





    await interaction.reply({

        content:
        "✅ Thank you for your review!",

        ephemeral:true

    });



};