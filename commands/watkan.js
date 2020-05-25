const Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    var opties = ["Kan helemaal niks", "kan vliegen kijk maar!", "kan vrij weinig", "kan nog net plassen", "kan zichzelf pijn doen", "Kan erg slim zijn", "Kan erg dom zijn", "Kan gewoon radio maken hoor", "Kan bij de politie werken", "Kan vuilnisman worden", "Kan succesvol worden met Tikok"]
    var optie = Math.floor(Math.random() * opties.length);

    message.channel.send(`${args[0]} ` + opties[optie]);

}

module.exports.help = {
    name: "watkan"
}