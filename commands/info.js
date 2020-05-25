const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


    var botEmbed = new discord.MessageEmbed()
    .setTitle("Informatie over NBR")
    .setDescription("Bekijk hier alle informatie van de NBR Discord Server")
    .setColor("F61CB0")
    // .addFields(
    //     {name: "", value:"" }
    // )
    .addField("Naam van de bot: ", bot.user.username)
    .setThumbnail("https://i.imgur.com/nk3hFYi.jpg")
    .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
    .setTimestamp();


return message.channel.send(botEmbed);



}

module.exports.help = {
    name: "info"
}