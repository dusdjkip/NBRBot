const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


    const categoryID = "717094952512782406";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
            ticketBestaat = true;

            message.channel.send("Oei! Je hebt al een ticket!")

            return;
        }
        
    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hey " + message.author.username)
        .setFooter("Support kanaal word aangemaakt!");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hey ${message.author.username}!`)
                        .setDescription("Zet hier je bericht / vraag in. Wij helpen je Z.S.M.")
                        .setFooter("© NBRadio 2020", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
                        .setTimestamp();

                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Er is iets fout gegaan :(");
            });
        }
    ).catch(err => {
        message.channel.send("Er is iets fout gegaan :(");
    });


}

module.exports.help = {
    name: "ticket"
}