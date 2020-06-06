const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    // try{

    //     var text = "**NoBordersRadio Bot** \n\n **__Commando's__** \n !website - Krijg de link van onze website! \n !idee - Heb je een idee? Laat het ons weten! \n !suggestie - Heb jij een suggestie? Kom maar door! \n !ping - Bekijk je ping \n !bier - Krijg een lekker biertje \n !info - Geeft informatie \n !serverinfo - Krijg de server informatie \n !report - Rapporteer een member. \n !review - Schrijf een review \n !help - Verkrijg deze help tekst van mij! \n\n **__Admin Commando's__** \n !tempmute - Mute een persoon! \n !kick - Kick een gebruiker \n !ban - Verban een gebruiker \n !clear - Verwijder berichten in een keer \n !warn - Waarschuw een gebruiker \n !clearwarn - Haal een waarschuwing van de gebruiker weg "

    //     message.author.send(text);

    //     message.channel.send("Alle commando's kan je vinden in je DM!");

    // }catch(error){
    //     message.channel.send("Oei er is iets mis gegaan :(");
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    client.commands.forEach(command => {

        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category
        }

        commandList.push(constructor);

    });

    var response = "**NBR Commando's**\n\n";
    var general = "**Algemeen**\n";
    var info = "\n**Informatie**\n";
    var fun = "\n**Fun**\n";
    var staff = "\n**beheer**\n";

    for (let i = i < commandList.length; i++) {
        const command = commandList[i];

        if (command["general"] == "Algemeen") {

            general += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["info"] == "Informatie") {

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["fun"] == "Fun") {

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if (command["staff"] == "Staff") {

            info += `${prefix}${command["name"]} - ${command["description"]}\n`;

        }

    }

    response += general;
    response += info;

    message.author.send(response).then(() => {

        message.channel.send("Alle commands staan in je privé berichten! :mailbox_with_mail:");

    }).catch(() => {
        message.channel.send("Je Privé berichten staan uit! Dus dit is niet mogelijk...");
    });


}

module.exports.help = {
    name: "help",
    description: "Geeft al de verschillende commando's",
    category: "Algemeen"
}