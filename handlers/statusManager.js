const { ActivityType } = require("discord.js");


module.exports = (client) => {


    const statuses = [

        {
            name: "Zey Store Orders",
            type: ActivityType.Watching
        },

        {
            name: "Roblox Flags",
            type: ActivityType.Playing
        },

        {
            name: "Tickets 24/7",
            type: ActivityType.Watching
        },

        {
            name: "Zey AI Support",
            type: ActivityType.Playing
        },

        {
            name: "Secure Payments",
            type: ActivityType.Watching
        },

        {
            name: "Zey Store Marketplace",
            type: ActivityType.Playing
        },

        {
            name: "Helping Customers",
            type: ActivityType.Watching
        }

    ];



    let index = 0;



    function updateStatus(){


        client.user.setActivity(

            statuses[index].name,

            {
                type:
                statuses[index].type
            }

        );


        index++;


        if(index >= statuses.length){

            index = 0;

        }


    }



    updateStatus();



    setInterval(

        updateStatus,

        15000

    );


};