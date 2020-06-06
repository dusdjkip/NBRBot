const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


    // !8ball <Vraag hier>


    if (!args[2]) return message.reply("Graag een vraag.");
    let replies = ["Nee.", "Reken er maar niet op", "Ik weet dat zo niet.", "Het lijkt er wel op.", "Reken er op!", "Misschien", "Ik kan deze vraag helaas even niet beantwoorden.", "Ik weet het zeker!"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    var ballembed = new discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setColor("#FF9900")
        .addField("Vraag", question)
        .addField("Antwoord", replies[result])
        .setFooter("Copyright NBRadio", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    message.channel.send(ballembed);


}

module.exports.help = {
    name: "8ball",
    description: "Gewoon een klassieker van NBR!",
    category: "Fun"
}