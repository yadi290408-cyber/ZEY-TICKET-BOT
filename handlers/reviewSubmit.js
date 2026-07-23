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





    const name =
    interaction.fields.getTextInputValue(
        "review_name"
    );



    const product =
    interaction.fields.getTextInputValue(
        "review_product"
    );



    const service =
    interaction.fields.getTextInputValue(
        "review_service"
    );



    const recommend =
    interaction.fields.getTextInputValue(
        "review_recommend"
    );



    const message =
    interaction.fields.getTextInputValue(
        "review_message"
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








    const userAvatar =
    interaction.user.displayAvatarURL({
        dynamic:true,
        size:1024
    });







    const embed =
    new EmbedBuilder()

    .setColor("#FFD700")

    .setAuthor({

        name:
        `${interaction.user.username} left a review`,

        iconURL:
        userAvatar

    })

    .setTitle(
        "⭐ New Zey Store Review"
    )

    .setThumbnail(
        userAvatar
    )

    .setDescription(`

━━━━━━━━━━━━━━

👤 **Customer**

${interaction.user}

🛒 **Product**

${product}

⭐ **Service**

${service}

👍 **Would Recommend**

${recommend}

💬 **Review**

${message}

━━━━━━━━━━━━━━

❤️ Thank you for choosing **Zey Store**

`)

    .setFooter({

        text:
        "Zey Store • Customer Reviews",

        iconURL:
        interaction.client.user.displayAvatarURL({
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