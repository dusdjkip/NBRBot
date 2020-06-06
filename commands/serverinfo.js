const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Discord Server Informatie")
        .setDescription("Bekijk hier alle Server informatie van de NBR Discord Server")
        .setColor("F61CB0")
        .addFields({
            name: "Bot Naam",
            value: bot.user.username
        }, {
            name: "Je bent gejoined op: ",
            value: message.member.joinedAt
        }, {
            name: "Totaal Members: ",
            value: message.guild.memberCount
        })

        .setThumbnail("https://i.imgur.com/nk3hFYi.jpg")
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();


    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "serverinfo",
    description: "Verkijg alle Discord server informatie",
    category: "Handig"
}