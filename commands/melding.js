const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, jij kan dit niet.");

    var seperator = "/";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Zo gebruik je het commando")
            .setColor("GREEN")
            .setDescription(`Maak een melding door gebruik te maken van: \n !melding titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "「📢」mededelingen";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var meldingEmbed = new discord.MessageEmbed()
        .setTitle("Melding")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${message.author} \n\n ${options.titel} \n ${options.bericht}`)
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();t

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("Dit kanaal bestaat niet..")

    channel.send(meldingEmbed);

}

module.exports.help = {
    name: "melding"
}