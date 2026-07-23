module.exports = {
    name: "ready",

    once: true,

    execute(client){

        console.log(`
================================
🤖 ${client.user.tag} ONLINE
🏪 Zey Store AI System
================================
        `);

        client.user.setActivity(
            "🚩 Zey Store | AI Shopping",
            {
                type: 3
            }
        );

    }
};