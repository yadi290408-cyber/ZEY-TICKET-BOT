const {
    EmbedBuilder
} = require("discord.js");


const reviewsChannel =
"1432895961922801667";



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
        reviewsChannel
    );






    if(channel){


        const embed =
        new EmbedBuilder()

        .setColor("#FFD700")

        .setTitle(
            "⭐ New Customer Review"
        )

        .setDescription(`

👤 Customer:
${interaction.user}

🆔 User ID:
\`${interaction.user.id}\`

━━━━━━━━━━━━━━

💬 Review:

${review}

━━━━━━━━━━━━━━

Thank you for choosing **Zey Store** ❤️

        `)

        .setThumbnail(
            interaction.user.displayAvatarURL({
                dynamic:true
            })
        )

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