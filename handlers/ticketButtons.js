const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = async (interaction) => {


    if(!interaction.isButton()) return;



    // SUBMIT CODE BUTTON

    if(interaction.customId === "submit_code"){


        const modal = new ModalBuilder()

        .setCustomId("submit_code")

        .setTitle("Submit Gift Card Code");



        const codeInput = new TextInputBuilder()

        .setCustomId("gift_code")

        .setLabel("Gift Card Code")

        .setPlaceholder("Enter your G2A code here")

        .setStyle(TextInputStyle.Short)

        .setRequired(true);



        const row =
        new ActionRowBuilder()
        .addComponents(codeInput);



        modal.addComponents(row);



        await interaction.showModal(modal);


        return;

    }





    // CLAIM

    if(interaction.customId === "claim_order"){


        await interaction.reply({

            content:
            `✅ Order claimed by ${interaction.user}`

        });


        return;

    }






    // CLOSE

    if(interaction.customId === "close_ticket"){


        await interaction.reply({

            content:
            "🔒 Closing ticket..."

        });


        setTimeout(()=>{

            interaction.channel.delete()
            .catch(()=>{});


        },3000);



        return;

    }



};