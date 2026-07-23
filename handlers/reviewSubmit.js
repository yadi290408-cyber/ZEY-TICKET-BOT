const {
    EmbedBuilder
} = require("discord.js");


const reviewsChannel =
process.env.REVIEWS_CHANNEL;



module.exports = async(interaction)=>{


    if(!interaction.isModalSubmit())
        return;



    if(
        interaction.customId !== "submit_review"
    )
        return;



    console.log("REVIEW MODAL");



    const review =
    interaction.fields.getTextInputValue(
        "review_text"
    );





    const channel =
    interaction.guild.channels.cache.get(
        reviewsChannel
    );





    if(!channel){

        return interaction.reply({

            content:
            "❌ Review channel not found.",

            ephemeral:true

        });

    }






    const embed =
    new EmbedBuilder()

    .setColor("#FFD700")

    .setTitle(
        "⭐ New Zey Store Review"
    )

    .setDescription(`

👤 **Customer**

${interaction.user}


━━━━━━━━━━━━━━


💬 **Review**

${review}


━━━━━━━━━━━━━━


❤️ Thank you for choosing **Zey Store**

`)

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