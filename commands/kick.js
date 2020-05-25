const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Hoho... Jij hebt hier geen permissie voor om dit commando te gebruiken!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Hoho... Jij hebt hier geen permissie voor om dit commando te gebruiken!");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    if (!args[1]) return message.reply("Geen redenen opgegeven.");

    if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij mag geen ander teamlid kicken!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[2]));

    var reason = args.slice(1).join(" ");

    if (!kickUser) return message.reply("Gebruiker is niet gevonden");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Gelieve binnen 30 seconde te reageren.")
        .setDescription(`Wil je${kickUser} kicken?`)
        .setThumbnail("https://i.imgur.com/nk3hFYi.jpg")
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setFooter(message.member.displayName, "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp()
        .setDescription(`**Gekickt: ** ${kickUser} (${kickUser.id})
        **Gekickt door:** ${message.author}
        **Redenen:** ${reason}`);

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.reply("Er is iets fout gegaan.")
            });

            message.channel.send(embed);

        } else if (emoji === "❌") {

            msg.delete();

            message.reply("De kick is geanulleerd.").then(m => m.delete(5000));

        }

        // Dit is als je ja en nee wilt antwoorden

        // message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000 }).then(collected => {

        //     if (collected.first().content.toLowerCase() == 'ja') {

        //         kickUser.kick(reason).catch(err => {
        //             if (err) return message.reply("Er is iets fout gegaan.");
        //         });

        //     } else {
        //         return message.reply("Opdracht opgeheven.");
        //     }

        // });

    })
}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}


module.exports.help = {
    name: "kick"
}