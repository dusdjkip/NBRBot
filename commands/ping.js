const discord = require("discord.js");
const botConfig = require("../botconfig.json");

var prefix = botConfig.prefix;

module.exports.run = async (bot, message, args) => {

    var ping = Date.now() - message.createdTimestamp + " ms";

    if (message.content.startsWith(prefix + "ping")) {

        var ping = Date.now() - message.createdTimestamp + " ms";
        message.channel.send("Jou ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`");

    }



}

module.exports.help = {
    name: "ping",
    description: "Hoe hoog is jou ping?",
    category: "Handig"
}