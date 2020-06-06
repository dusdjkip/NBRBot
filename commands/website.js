const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Onze website is https://NBRadio.nl/");



}

module.exports.help = {
    name: "website",
    description: "Wat is onze website?",
    category: "Algemeen"
}