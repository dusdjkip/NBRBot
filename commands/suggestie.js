const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // Vang het idee op.
    var suggestie = args.join(" ");

    // Kijk na als er een suggestie is meegegeven.
    if (!suggestie) return message.channel.send("Geen suggestie meegegeven gelieve een idee mee te geven.");

    // Maak het embed aan.
    var suggestieEmbed = new discord.MessageEmbed()
        .setTitle("Nieuwe suggestie")
        .setColor("#00FF00")
        .addField("Suggestie: ", suggestie)
        .addField("Ingezonden door: ", message.author);

    // Vind het kanaal.「📝」suggesties
    var suggestieChannel = message.guild.channels.cache.find(channel => channel.name === "「📝」suggesties");
    if (!suggestieChannel) return message.guild.send("Kan het kanaal niet vinden");

    // Verzend het bericht en voeg er reacties aan toe.
    suggestieChannel.send(suggestieEmbed).then(embedMessage => {
        embedMessage.react('👍');
        embedMessage.react('👎');
    });

    // Einde.

}

module.exports.help = {
    name: "suggestie",
    description: "Heb je een suggestie. Zet het dan hier en misschien passen we het toe.",
    category: "Algemeen"
}