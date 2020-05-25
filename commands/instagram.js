const discord = require("discord.js");
const fetch = require("node-fetch");
const stripIndents  = require("common-tags");

module.exports.run = async (bot, message, args) => {

    const name = args.join(" ");

    if (!name) {
        return message.reply("Misschien handig om naar een naam te zoeken :)")
            .then(msg => msg.delete({ timeout: 5000 }));
    }

    const url = `https://instagram.com/${name}/?__a=1`;

    const res = await fetch(url).then(url => url.json());

    if (!res.graphql.user.username) {
        return message.reply("Wij kunnen dat account niet vinden in onze database.")
            .then(msg => msg.delete({ timeout: 5000 }));
    }

    const account = res.graphql.user;

    const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(account.full_name)
        .setURL(account.external_url_linkshimmed)
        .setThumbnail(account.profile_pic_url_hd)
        .addField("Profiel Informatie", `** Gebruikersnaam:** ${account.username}
        **- Volledige Naam:** ${account.full_name}
        **- Biografie:** ${account.biography.length == 0 ? "Geen" : account.biography}
        **- Aantal Posts:** ${account.edge_owner_to_timeline_media.count}
        **- Aantal volgers:** ${account.edge_followed_by.count}
        **- Aantal Volgend:** ${account.edge_follow.count}
        **- Prive account:** ${account.is_private ? "Ja 🔐" : "Nee 🔓"}`)
        .setFooter("Copyright NBRadio", "https://cloud.gmpnetwork.nl/index.php/apps/files_sharing/publicpreview/S5GjTjc8JNDoXij?x=1018&y=797&a=true&file=dec2019logo2favicon.png&scalingup=0")
        .setTimestamp();

    message.channel.send(embed);


}

module.exports.help = {
    name: "insta"
}