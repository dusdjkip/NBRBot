const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, jij kan dit niet.");

    var seperator = "/";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Zo gebruik je het update commando")
            .setColor("GREEN")
            .setDescription(`Maak een update mededeling aan door gebruik te maken van de volgende opstelling: \n !update De update ${seperator} Omschrijving ${seperator} kleur (Standaard is groen) ${seperator} kanaal (Standaard is 「💻」updates)`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#00FF78";
    if (argsList[3] === undefined) argsList[3] = "「💻」updates";

    var options = {

        titel: argsList[0] || "Geen titel meegegeven", 
        bericht: argsList[1] || "Geen update meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var updateEmbed = new discord.MessageEmbed()
        .setTitle("UPDATE!")
        .setColor(options.kleur)
        .setDescription(`Update gedaan door ${message.author} \n\n**Update: **\n\n ${options.titel} \n\n**Omschrijving: **\n\n ${options.bericht}`)
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    let announceChannel = message.mentions.channels.first();

    if(!announceChannel) return message.reply("Dit kanaal bestaat niet..")
    
    announceChannel.send(updateEmbed);

}

module.exports.help = {
    name: "update"
}