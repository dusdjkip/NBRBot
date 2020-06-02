const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryID = "717094952512782406";

    if (!message.member.hasPermission("KICK_MEMBER")) return message.reply("Jij kan dit niet doen!")

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

        // Embed Create
        var embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("De ticket is gemarkeerd als **Compleet**.")
            .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
            .setTimestamp();

        // Channel voor logging

        var ticketChannel = message.member.guild.channels.cache.get(channel => channel.name === "717106837564162149");
        if (!ticketChannel) return message.channel.send("Kanaal bestaat niet.");

        ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("Gelieve dit commando in een ticket kanaal te gebruiken.");

    }


}

module.exports.help = {
    name: "close"
}