const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij hebt hier geen recht op.");

    if (!args[0]) return message.channel.send("Geen gebruiker gevonden.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij hebt hier geen recht op.");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.channel.send("Gebruik het commando zo: !tempmute <@Gebruiker> <s, m, h> (Secondes, minuten, Uren)");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij mag geen ander teamlid muten!");

    var muteRole = message.guild.roles.cache.get('711534589549477960');

    if (!muteRole) return message.channel.send("De role muted bestaat niet.");

    var muteTime = args[1];

    if (!muteTime) message.channel.send("Gebruik het commando zo: !tempmute <@Gebruiker> <s, m, h> (Secondes, minuten, Uren)");

    await (mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted voor ${muteTime}!`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);
        message.channel.send(`${mutePerson} is geunmuted!`);

    }, ms(muteTime));



}

module.exports.help = {
    name: "tempmute",
    description: "Mute een gebruiker",
    category: "Staff"
}