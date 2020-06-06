const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var avatarembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Hey! Hier de link naar je avatar")
        .setDescription(`<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`)
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    message.channel.send(avatarembed);

}

module.exports.help = {
    name: "getavatarurl",
    description: "Geeft de link van je avater.",
    category: "Handig"
}