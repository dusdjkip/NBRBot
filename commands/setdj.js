const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var role = message.guild.roles.cache.find(role => role.name === "「📡」- Live DJ");
    message.member.roles.add(role);

    if(!role) return message.channel.send("er is iets fout gegaan");

    message.reply("Je hebt je rang met succes gekregen! Vergeet na je uitzending niet !remdj te doen!");



}

module.exports.help = {
    name: "setdj"
}