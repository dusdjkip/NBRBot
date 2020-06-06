const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij hebt hier geen recht op.");

    if (!args[0]) return message.channel.send("Geen gebruiker gevonden.");

    if (!args[1]) return message.channel.send("Gelieve een reden op te geven.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij hebt hier geen recht op.");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.channel.send("Kan de gebruiker niet vinden.");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij mag geen ander teamlid waarschuwen!");

    if (!warns[warnUser.id]) warns[warnUser.id] = {

        warns: 0

    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewaarschuwed:** ${warnUser} (${warnUser.id}
        **Gewaarschuwed door:** ${message.author}
        **Met reden:** ${reason}`)
        .addField("Aantal waarschuwingen: ", warns[warnUser.id].warns);

    var channel = message.member.guild.channels.cache.get("708376379766472735");

    if (!channel) return console.log(err);

    channel.send(embed);

    if (warns[warnUser.id].warns == 1) {

        message.channel.send(`Oei ${warnUser}, Jij bent gewaarschuwed. Dit is je eerste waarschuwing. Wij raden je aan om even opnieuw de regels te lezen.`);

    } else if (warns[warnUser.id].warns == 2) {

        var embed = new discord.MessageEmbed()
            .setColor("ORANGE")
            .setTitle("PAS OP!")
            .setDescription(`${warnUser}, Je bent nog maar 1 waarschuwing verwijderd voor volgende maatregelen.`)
            .setFooter("© GMPNetwork Shield 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
            .setTimestamp();

        message.channel.send(embed);


    } else if (warns[warnUser.id].warns == 3) {

        message.guild.member(warnUser).kick(reason)
        message.channel.send(`${warnUser} is van de server afgeschopt wegens teveel waarschuwingen.`);

    } else if (warns[warnUser.id].warns == 4) {

        var embed = new discord.MessageEmbed()
            .setColor("RED")
            .setTitle("PAS OP!")
            .setDescription(`${warnUser}, Je bent nog maar 1 waarschuwing verwijderd voor volgende drastische maatregelen.`)
            .setFooter("© GMPNetwork Shield 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
            .setTimestamp();

        message.channel.send(embed);

    } else if (warns[warnUser.id].warns == 5) {

        message.guild.member(warnUser).ban(reason)
        message.channel.send(`${warnUser} is van de server geband wegens veel teveel waarschuwingen, het systeem heeft deze keuze gemaakt.`);

    }
}


module.exports.help = {
    name: "warn",
    description: "Waarschuw een gebruiker",
    category: "Staff"
}