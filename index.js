require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    GatewayIntentBits,
    Collection,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

const config = {
    token: process.env.TOKEN
};


const client = new Client({

    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]

});



client.commands = new Collection();

const handlers = {};




// LOAD COMMANDS

const commandsPath = path.join(__dirname,"commands");


if(fs.existsSync(commandsPath)){

    for(const file of fs.readdirSync(commandsPath)
    .filter(f=>f.endsWith(".js"))){

        const command =
        require(`./commands/${file}`);


        if(command.data && command.execute){

            client.commands.set(
                command.data.name,
                command
            );


            console.log(
                `✅ Command loaded: ${command.data.name}`
            );

        }

    }

}






// LOAD HANDLERS

const handlersPath = path.join(__dirname,"handlers");


if(fs.existsSync(handlersPath)){


    for(const file of fs.readdirSync(handlersPath)
    .filter(f=>f.endsWith(".js"))
    .filter(f=>f !== "handlerLoader.js")){


        const handler =
        require(`./handlers/${file}`);


        handlers[file.replace(".js","")] = handler;


        console.log(
            `✅ Handler loaded: ${file}`
        );


    }

}





console.log(
"AVAILABLE HANDLERS:",
Object.keys(handlers)
);








client.once(
Events.ClientReady,
()=>{

console.log(
`🔥 ${client.user.tag} is online!`
);


// START BOT STATUS ROTATION
require("./handlers/statusManager")(client);


});








client.on(
Events.InteractionCreate,
async interaction=>{


console.log(
"NEW INTERACTION:",
interaction.customId || interaction.commandName
);



try{





// COMMANDS

if(interaction.isChatInputCommand()){


const command =
client.commands.get(
interaction.commandName
);


if(command){

await command.execute(
interaction
);

}


return;

}








// DROPDOWN

if(interaction.isStringSelectMenu()){


if(interaction.customId === "flag_select"){


if(handlers.flagSelect){

await handlers.flagSelect(
interaction
);

}


return;

}


}









// MODALS

if(interaction.isModalSubmit()){


// CODE

if(
interaction.customId === "submit_code_modal"
){


console.log(
"CODE MODAL"
);


if(handlers.codeSubmit){

await handlers.codeSubmit(
interaction
);

}


return;

}







// REVIEW

if(
interaction.customId === "submit_review"
){


console.log(
"REVIEW MODAL"
);



if(handlers.reviewSubmit){

await handlers.reviewSubmit(
interaction
);

}else{


console.log(
"❌ reviewSubmit.js missing"
);


await interaction.reply({

content:
"❌ Review system fejl.",

ephemeral:true

});


}


return;

}


}









// BUTTONS

if(interaction.isButton()){


const id =
interaction.customId;






if(id === "submit_code"){



const modal =
new ModalBuilder()

.setCustomId(
"submit_code_modal"
)

.setTitle(
"Submit Gift Card Code"
);



const input =
new TextInputBuilder()

.setCustomId(
"gift_code"
)

.setLabel(
"Gift Card Code"
)

.setPlaceholder(
"Enter your G2A code here"
)

.setStyle(
TextInputStyle.Short
)

.setRequired(true);




modal.addComponents(

new ActionRowBuilder()
.addComponents(input)

);



await interaction.showModal(
modal
);


return;

}









if(
id === "claim_order" ||
id === "close_ticket"
){


if(handlers.ticketButtons){

await handlers.ticketButtons(
interaction
);

}


return;

}









if(
id.startsWith("accept_order_") ||
id.startsWith("deny_order_")
){


if(handlers.orderStatusButtons){

await handlers.orderStatusButtons(
interaction
);

}


return;

}









if(
id === "leave_review"
){


if(handlers.reviewButtons){

await handlers.reviewButtons(
interaction
);

}


return;

}



}





}catch(error){


console.error(
"INTERACTION ERROR:",
error
);



if(
!interaction.replied &&
!interaction.deferred
){

await interaction.reply({

content:
"❌ Something gik galt.",

ephemeral:true

}).catch(()=>{});

}


}



});








client.login(config.token);