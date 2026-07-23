const { REST, Routes } = require("discord.js");
const fs = require("fs");
const config = require("./database/config.json");


const commands = [];


const commandFiles =
fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));



for(const file of commandFiles){

    const command =
    require(`./commands/${file}`);


    commands.push(
        command.data.toJSON()
    );

    console.log(
        "Loaded:",
        file
    );

}



const rest = new REST({

    version:"10"

}).setToken(config.token);



(async()=>{


try{


console.log("Refreshing commands...");



await rest.put(

    Routes.applicationGuildCommands(

        "1529316259903180891",

        config.guildId

    ),

    {

        body:commands

    }

);



console.log(
"✅ Commands deployed!"
);



}catch(error){

console.error(error);

}



})();