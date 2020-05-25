const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    try{

        var text = "**NoBordersRadio Bot** \n\n **__Commando's__** \n !website - Krijg de link van onze website! \n !idee - Heb je een idee? Laat het ons weten! \n !suggestie - Heb jij een suggestie? Kom maar door! \n !ping - Bekijk je ping \n !bier - Krijg een lekker biertje \n !info - Geeft informatie \n !serverinfo - Krijg de server informatie \n !report - Rapporteer een member. \n !review - Schrijf een review \n !help - Verkrijg deze help tekst van mij! \n\n **__Admin Commando's__** \n !tempmute - Mute een persoon! \n !kick - Kick een gebruiker \n !ban - Verban een gebruiker \n !clear - Verwijder berichten in een keer \n !warn - Waarschuw een gebruiker \n !clearwarn - Haal een waarschuwing van de gebruiker weg "

        message.author.send(text);

        message.channel.send("Alle commando's kan je vinden in je DM!");

    }catch(error){
        message.channel.send("Oei er is iets mis gegaan :(");
    }


}

module.exports.help = {
    name: "help"
}