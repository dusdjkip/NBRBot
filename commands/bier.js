const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


    message.channel.send("🍺Hiero, Een biertje voor jou!🍻");

}

module.exports.help = {
    name: "bier"
}