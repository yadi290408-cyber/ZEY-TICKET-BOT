const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = async(interaction)=>{


    if(!interaction.isButton())
        return;


    if(interaction.customId !== "leave_review")
        return;



    try {


        const modal =
        new ModalBuilder()

        .setCustomId(
            "submit_review"
        )

        .setTitle(
            "⭐ Zey Store Review"
        );





        const name =
        new TextInputBuilder()

        .setCustomId(
            "review_name"
        )

        .setLabel(
            "Your Discord username"
        )

        .setPlaceholder(
            "Example: Yad#0001"
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setRequired(true);





        const product =
        new TextInputBuilder()

        .setCustomId(
            "review_product"
        )

        .setLabel(
            "What did you purchase?"
        )

        .setPlaceholder(
            "Example: Elite Flag"
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setRequired(true);





        const service =
        new TextInputBuilder()

        .setCustomId(
            "review_service"
        )

        .setLabel(
            "How was the service?"
        )

        .setPlaceholder(
            "Tell us about your experience"
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setRequired(true);





        const recommend =
        new TextInputBuilder()

        .setCustomId(
            "review_recommend"
        )

        .setLabel(
            "Would you recommend Zey Store?"
        )

        .setPlaceholder(
            "Yes or No and why?"
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setRequired(true);





        const message =
        new TextInputBuilder()

        .setCustomId(
            "review_message"
        )

        .setLabel(
            "Your review"
        )

        .setPlaceholder(
            "Write your full review here..."
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setRequired(true);






        modal.addComponents(

            new ActionRowBuilder()
            .addComponents(name),

            new ActionRowBuilder()
            .addComponents(product),

            new ActionRowBuilder()
            .addComponents(service),

            new ActionRowBuilder()
            .addComponents(recommend),

            new ActionRowBuilder()
            .addComponents(message)

        );





        await interaction.showModal(
            modal
        );



    } catch(error){


        console.log(
            "REVIEW BUTTON ERROR:",
            error
        );


    }


};