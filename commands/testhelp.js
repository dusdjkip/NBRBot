const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let helpembed = new Discord.MessageEmbed()
        //color and title
        .setTitle('Help | Algemene Commands')
        .setColor('GREEN')

        //Category
        .addField("Commands:", "``suggestie`` ``avatar`` ``help`` ``idee`` ``info`` ``ping`` ``report`` ``review`` ``serverinfo`` ``website`` ")
        //footer shit
        .setThumbnail("https://i.imgur.com/nk3hFYi.jpg")
        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    message.channel.send(helpembed).then(m => {
        m.react('➡️');
        
        const filter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;
        const collector = m.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000});

        collector.on('collect', () => {
            message.reactions.remove(userId);
            let helpembed = new Discord.MessageEmbed()
                //color and title
               .setTitle('Help | DJ Commands')
                .setColor('GREEN')
            
                //Category
                .addField("Commands:", "``setdj`` ``remdj``")
                 //footer shit
                .setThumbnail("https://i.imgur.com/nk3hFYi.jpg")
                .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
                .setTimestamp();

            m.edit(helpembed)

        });
    }).catch(err => console.error(err));

}

module.exports.help = {
    name: "testhelp"
}